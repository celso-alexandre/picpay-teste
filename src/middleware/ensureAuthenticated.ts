import { Request, Response, NextFunction } from 'express';

export default async function ensureAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction,
): Promise<any> {
   const authHeader = request.headers.authorization;
   if (!authHeader) {
      return response.status(401).json({ message: 'Token nao foi informado' });
   }

   const [, token] = authHeader.split(' ');

   if (token !== process.env.API_SECURITY_TOKEN) {
      return response.status(401).json({ message: 'Token invalido' });
   }

   return next();
}
