import Payment from './payment';

export default class Picpay {
  public picpayToken: string;

  public sellerToken: string;

  public httpClient: any;

  constructor(picpayToken: string, sellerToken: string) {
     this.picpayToken = picpayToken;
     this.sellerToken = sellerToken;

     this.httpClient = new Payment(this.picpayToken, this.sellerToken);
  }

  get payment(): Payment {
     return this.httpClient;
  }
}
