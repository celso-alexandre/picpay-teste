import axios, { AxiosInstance } from 'axios';

export default class Api {
  private instance: AxiosInstance;

  public picpayToken: string;

  public sellerToken: string;

  private baseUrl: string;

  constructor(picpayToken: string, sellerToken: string) {
     this.picpayToken = picpayToken;
     this.sellerToken = sellerToken;

     this.baseUrl = 'https://appws.picpay.com/ecommerce/public';

     this.instance = axios.create({
        baseURL: this.getBaseUrl(),
        headers: {
           'accept-encoding': 'gzip,deflate',
           'Content-Type': 'application/json',
           'x-picpay-token': this.picpayToken,
        },
     });
  }

  public getBaseUrl(): string {
     return this.baseUrl;
  }

  public async post(uri: string, body: any): Promise<any> {
     try {
        const { status, data } = await this.instance.post(uri, body);
        return { status, data };
     } catch (err) {
        if (err.response) {
           const { status, data } = err.response;
           return { status, data };
        }

        return err;
     }
  }

  public async get(uri: string, params: any): Promise<any> {
     try {
        const { status, data } = await this.instance.get(uri, params);
        return { status, data };
     } catch (err) {
        if (err.response) {
           const { status, data } = err.response;
           return { status, data };
        }

        return err;
     }
  }
}
