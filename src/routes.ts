import { Router } from 'express';
import PaymentController from './controller/PaymentController';
import ensureAuthenticated from './middleware/ensureAuthenticated';

class Routes {
   routes: Router;

   paymentController: PaymentController;

   constructor() {
      this.routes = Router();
      this.paymentController = new PaymentController();

      this.routes.post('/payment/notification', async (request, response) => {
         this.paymentController.notification(request, response);
      });

      this.routes.use(ensureAuthenticated);

      this.routes.post('/payment/make', (request, response) => {
         this.paymentController.make(request, response);
      });

      this.routes.post('/payment/:referenceId/cancel', (request, response) => {
         this.paymentController.cancel(request, response);
      });

      this.routes.get('/payment/:referenceId/status', (request, response) => {
         this.paymentController.status(request, response);
      });
   }
}

export default Routes;
