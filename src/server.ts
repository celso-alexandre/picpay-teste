import express from 'express';
import Payment from './picpay/Payment';

require('dotenv').config();

const server = express();
server.use(express.json());

// const { TOKEN, SELLER_TOKEN } = process.env;
const picpayPayment = new Payment(process.env.TOKEN as string, process.env.SELLER_TOKEN as string);

server.post('/payment', async (request, response) => {
   const buyer = {
      firstName: 'Jean Barbosa',
      lastName: 'Dos Santos',
      document: '048.789.011-60',
      email: 'programmer.jean@gmail.com',
      phone: '+55 61 99357-6555',
   };

   const payload = {
      referenceId: '1020400',
      value: 2.51,
      callbackUrl: 'http://www.sualoja.com.br/callback',
      returnUrl: 'http://www.sualoja.com.br/cliente/pedido/1020400',
      expiresAt: '2022-05-01T16:00:00-03:00',
      buyer,
   };

   const { status, data } = await picpayPayment.post('/payment', payload);

   response.json(data);
});

server.listen(3333, () => {
   console.log('API escutando na porta 3333');
});
