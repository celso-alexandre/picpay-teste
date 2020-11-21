import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface IApi {
   picpayToken: string;
   sellerToken: string;
   baseURL?: string;
}

interface ApiPost {
   uri: string;
   body: Record<string, unknown>; // recomendacao do eslint no lugar de "object"
}

interface ApiGet {
   uri: string;
   params?: Record<string, unknown>;
}

class Api {
   picpayToken: string;

   api: AxiosInstance;

   sellerToken: string;

   baseURL?: string

   constructor({ picpayToken, sellerToken, baseURL = 'https://appws.picpay.com/ecommerce/public' }: IApi) {
      this.picpayToken = picpayToken;
      this.sellerToken = sellerToken;
      this.baseURL = baseURL;

      this.api = axios.create({
         baseURL: this.baseURL,
         headers: {
            'accept-encoding': 'gzip,deflate',
            'Content-Type': 'application/json',
            'x-picpay-token': this.picpayToken,
         },
      });
   }

   async post({ uri, body }: ApiPost): Promise<AxiosResponse> {
      const response = await this.api.post(uri, body);
      return response;
   }

   async get({ uri, params }: ApiGet): Promise<AxiosResponse> {
      const response = await this.api.get(uri, params);
      return response;
   }
}

export default Api;
