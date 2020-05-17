export type CreateAccountRequest = {
  name: string;
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
};

export interface UpdateAccountRequest extends CreateAccountRequest {
  balance: number;
}
