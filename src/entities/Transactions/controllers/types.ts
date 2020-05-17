export type CreateTransactionRequest = {
  amount: number;
  typeId: number;
  accountId: number;
  date: number;
  note?: string;
  categoryId?: number;
  place?: string;
};

export type UpdateTransactionRequest = CreateTransactionRequest;
