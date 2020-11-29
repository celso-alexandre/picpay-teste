import express from 'express';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import Routes from './routes';

dotenv.config();
const server = express();
server.use(express.json());

createConnection().then(() => {
   const routes = new Routes();
   server.use(routes.routes);
   server.listen(3333, () => {
      // eslint-disable-next-line no-console
      console.log('API escutando na porta 3333');
   });
}).catch((error) => {
   // eslint-disable-next-line no-console
   console.log(error);
});
