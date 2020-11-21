import Payment from './payment';

interface IPicpay {
   picpayToken: string;
   sellerToken: string;
}

class Picpay {
   private picpayToken: string;

   private sellerToken: string;

   public payment: Payment;

   constructor({ picpayToken, sellerToken }: IPicpay) {
      this.picpayToken = picpayToken;
      this.sellerToken = sellerToken;

      this.payment = new Payment({ picpayToken: this.picpayToken, sellerToken: this.sellerToken });
   }
}

export default Picpay;
