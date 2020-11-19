export interface IBuyer {
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  phone: string;
}

export default class Buyer {
  public firstName: string;

  public lastName: string;

  public document: string;

  public email: string;

  public phone: string;

  constructor(buyer: IBuyer) {
    this.firstName = buyer.firstName;
    this.lastName = buyer.lastName;
    this.document = buyer.document;
    this.email = buyer.email;
    this.phone = buyer.phone;
  }
}
