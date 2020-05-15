export type CreateAccountRequest = {
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
};
