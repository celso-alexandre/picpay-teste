import express from 'express';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const server = express();
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
   // eslint-disable-next-line no-console
   console.log('API escutando na porta 3333');
});
