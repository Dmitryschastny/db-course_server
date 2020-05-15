export type CreateAccountRequest = {
  name: string;
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
};
