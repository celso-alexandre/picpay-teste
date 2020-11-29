import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import Picpay from '../lib/picpay';
import Buyer from '../lib/picpay/Buyer';
import Pagamento from '../typeorm/entity/Pagamento';
import PagamentoLog from '../typeorm/entity/PagamentoLog';

interface MakePayment {
   referenceId: string;
   value: number;
   callbackUrl: string;
   buyer: Buyer;
   expiresAt: string;
   returnUrl: string;
}

interface CancelPayment {
   referenceId: string;
   authorizationId?: string;
}

interface PaymentStatus {
   referenceId: string;
}

interface PaymentNotification {
   referenceId: string;
   authorizationId?: string;
}

export default class PaymentController {
   pagamentoRepository: Repository<Pagamento>;

   pagamentoLogRepository: Repository<PagamentoLog>;

   picpay : any;

   constructor() {
      this.pagamentoRepository = getRepository(Pagamento);
      this.pagamentoLogRepository = getRepository(PagamentoLog);

      this.picpay = new Picpay({
         picpayToken: process.env.PICPAY_TOKEN as string,
         sellerToken: process.env.PICPAY_SELLER_TOKEN as string,
      });
   }

   async make(request: Request, response: Response): Promise<Response> {
      const {
         referenceId,
         value,
         // callbackUrl,
         returnUrl,
         expiresAt,
         buyer,
      } = request.body as MakePayment;

      const dadosRequest = {
         referenceId,
         value,
         callbackUrl: process.env.PICPAY_CALLBACK_URL,
         returnUrl,
         expiresAt,
         buyer,
      };

      const pagamentoLog = new PagamentoLog();
      pagamentoLog.metodo_http = 'POST';
      pagamentoLog.api_uri = '/payment/make';
      pagamentoLog.request = { body: request.body } as any;

      try {
         const picpayResponse = await this.picpay.payment.make(dadosRequest);
         pagamentoLog.response = picpayResponse.data;
         pagamentoLog.status_http = picpayResponse.status;

         const { content: checkout_url, base64: qrcode } = picpayResponse.data.qrcode;

         const pagamento = new Pagamento();
         pagamento.reference_id = referenceId;
         pagamento.value = value;
         pagamento.checkout_url = checkout_url;
         pagamento.qrcode = qrcode;

         const pagamentoGerado = await this.pagamentoRepository.save(pagamento);
         pagamentoLog.id_pagamento = pagamentoGerado.id;
         pagamentoLog.pagamentos_new = pagamentoGerado as any;

         return response.status(201).json(
            { message: 'Pagamento gerado. Aponte a camera do Smartphone', pagamento: pagamentoGerado },
         );
      } catch (err) {
         pagamentoLog.response = err.response?.data;
         pagamentoLog.status_http = (err.response?.status || 500);
         return response.status(err.response?.status || 500)
            .json(err.response?.data || { message: err.message });
      } finally {
         await this.pagamentoLogRepository.save(pagamentoLog);
      }

   /* Response possibilities:
   {
      "referenceId": "9",
      "paymentUrl": "https://app.picpay.com/checkout/NWZiOXXXNDEzZjAAAAAyOThiNzY2OTA3",
      "qrcode": {
         "content": "https://app.picpay.com/checkout/AAZiOTU1111zZjA1YzIyOThiNzYDOTA",
         "base64": "data:image/png;base64,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"
      },
      "expiresAt": "2020-11-28T15:58:25-02:00"
   }
   {
      "message": "Já existe referenceId='14'"
   }
   */
   }

   async cancel(request: Request, response: Response): Promise<Response> {
      const { referenceId } = request.params;
      const { authorizationId } = request.body;

      const dadosRequest = {
         referenceId,
         authorizationId,
      };

      const pagamentoLog = new PagamentoLog();
      pagamentoLog.metodo_http = 'POST';
      pagamentoLog.api_uri = '/payment/:referenceId/cancel';
      pagamentoLog.request = { body: request.body, params: request.params } as any;

      try {
         const pagamento = await this.pagamentoRepository.findOneOrFail({ reference_id: referenceId });
         pagamentoLog.id_pagamento = pagamento.id;
         pagamentoLog.pagamentos_old = JSON.stringify(pagamento) as any;

         const picpayResponse = await this.picpay.payment.cancel(dadosRequest as CancelPayment);
         pagamentoLog.response = picpayResponse.data;
         pagamentoLog.status_http = picpayResponse.status;
         pagamento.cancellation_id = picpayResponse.data.cancellationId;

         const pagamentoCancelado = await this.pagamentoRepository.save(pagamento);
         pagamentoLog.id_pagamento = pagamentoCancelado.id;
         pagamentoLog.pagamentos_new = pagamentoCancelado as any;

         return response.json(
            { message: 'Pagamento cancelado', pagamento: pagamentoCancelado },
         );
      } catch (err) {
         pagamentoLog.response = err.response?.data;
         pagamentoLog.status_http = (err.response?.status || 500);
         return response.status(err.response?.status || 500)
            .json(err.response?.data || { message: err.message });
      } finally {
         await this.pagamentoLogRepository.save(pagamentoLog);
      }

   /* Response possibilities:
   {
   "message": "Autorização inválida"
   }
   {
   "referenceId": "9",
   "cancellationId": "5f0009018053df099990f669"
   }
   */
   }

   public async status(request: Request, response: Response): Promise<Response> {
      const { referenceId } = request.params as unknown as PaymentStatus;

      const pagamentoLog = new PagamentoLog();
      pagamentoLog.metodo_http = 'GET';
      pagamentoLog.api_uri = '/payment/:referenceId/status';
      pagamentoLog.request = { params: request.params } as any;

      try {
         const pagamento = await this.pagamentoRepository.findOneOrFail({ reference_id: referenceId });
         pagamentoLog.pagamentos_old = JSON.stringify(pagamento) as any;
         pagamentoLog.id_pagamento = pagamento.id;

         const picpayResponse = await this.picpay.payment.status({ referenceId });
         pagamentoLog.response = picpayResponse.data;
         pagamentoLog.status_http = picpayResponse.status;

         if (picpayResponse.data.status === 'expired') {
            pagamento.expirado = true;
         }

         if (picpayResponse.data.status === 'paid') {
            pagamento.authorization_id = picpayResponse.data.authorizationId;
         }

         if (picpayResponse.data.status === 'refunded') {
            pagamento.authorization_id = picpayResponse.data.authorizationId;
            pagamento.estornado = true;
         }

         const pagamentoStatus = await this.pagamentoRepository.save(pagamento);
         pagamentoLog.id_pagamento = pagamentoStatus.id;
         pagamentoLog.pagamentos_new = pagamentoStatus as any;

         if (request.headers.blankResponse === '1') {
            return response.status(200).json();
         }

         return response.status(picpayResponse.status).json(pagamentoStatus);
      } catch (err) {
         pagamentoLog.response = err.response?.data;
         pagamentoLog.status_http = (err.response?.status || 500);
         return response.status(err.response?.status || 500)
            .json(err.response?.data || { message: err.message });
      } finally {
         await this.pagamentoLogRepository.save(pagamentoLog);
      }

   /* Response possibilites:
   {
      "referenceId": "8",
      "status": "expired"
   }

   {
      "message": "Pedido referenceId='9' não encontrado",
      "code": "422"
   }

   {
      "referenceId": "9",
      "status": "created"
   }

   {
      "referenceId": "9",
      "status": "paid",
      "authorizationId": "5f0005ae3999c22999901624"
   }

   {
   "referenceId": "9",
   "status": "refunded",
   "authorizationId": "5f0005ae3999c22999901624"
   }
   */
   }

   public async notification(request: Request, response: Response): Promise<Response> {
      const { referenceId } = request.body as PaymentNotification;
      request.params = {
         referenceId,
      };
      delete request.body.referenceId;
      request.headers.blankResponse = '1';
      return this.status(request, response);
   }
}
