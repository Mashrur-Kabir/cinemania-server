export interface ICinemaniaInvoiceData {
  invoiceId: string;
  userName: string;
  userEmail: string;
  planName: string; // e.g., "PRO Plan"
  amount: number;
  currency: string;
  transactionId: string;
  paymentDate: string;
  expiryDate: string; // Important for subscriptions
}
