import Api from './api';
import { IBuyer } from './buyer';

export interface IPayload {
  referenceId: string;
  value: number;
  callbackUrl: string;
  buyer: IBuyer;
  expiresAt?: string;
  returnUrl?: string;
}

export interface IQRcode {
  content: string;
  base64: string;
}

export interface IPaymentResponse {
  referenceId: string;
  paymentUrl: string;
  expiresAt: Date;
  qrcode: IQRcode;
}

export interface ITypeErro {
  field: string;
  message: string;
}

export interface IErrorResponse {
  message: string;
  errors?: ITypeErro;
}

export interface ICancel {
  referenceId: string;
  authorizationId?: string;
}

export interface ICancelResponse {
  referenceId: string;
  cancellationId: string;
}

export enum EStatus {
  'created',
  'expired',
  'analysis',
  'paid',
  'completed',
  'refunded',
  'chargeback',
}

export interface IStatusResponse {
  authorizationId: string;
  referenceId: string;
  status: EStatus;
}

export default class Payment {
  public httpClient: any;

  public picpayToken: string;

  public sellerToken: string;

  constructor(picpayToken: string, sellerToken: string) {
     this.picpayToken = picpayToken;
     this.sellerToken = sellerToken;

     this.httpClient = new Api(this.picpayToken, this.sellerToken);
  }

  /**
   * Solicitar o pagamento de um pedido no PicPay
   *
   * @param {IPayload} payload
   */
  async send(payload: IPayload): Promise<IPaymentResponse | IErrorResponse> {
     const uri = '/payments';
     const response = await this.httpClient.post(uri, payload);

     return response;
  }

  /**
   * cancelamento/estorno de um pedido
   */
  async cancel(body: ICancel): Promise<ICancelResponse | IErrorResponse> {
     const uri = `/payments/${body.referenceId}/cancellations`;

     const response = await this.httpClient.post(uri, body);

     return response;
  }

  /**
   * consultar o status de uma transação.
   *
   * @param {string} referenceId Identificador da transação
   */
  async status(referenceId: string): Promise<IStatusResponse | IErrorResponse> {
     const uri = `/payments/${referenceId}/status`;
     const response = await this.httpClient.get(uri);

     return response;
  }
}
