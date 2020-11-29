export default interface Buyer {
   firstName?: string; // Primeiro nome do comprador.
   lastName?: string; // Sobrenome do comprador.
   document: string; // CPF do comprador no formato 123.456.789-10
   email?: string; // E-mail do comprador.
   phone?: string; // Numero de telefone do comprador no formato +55 27 12345-6789
}
