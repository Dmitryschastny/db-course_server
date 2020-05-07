import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Accounts } from '../Accounts';
import { ExchangeRates } from '../ExchangeRates';
import { Settings } from '../Settings';
import { Transactions } from '../Transactions';

@Index('currencies_pk', ['id'], { unique: true })
@Entity('Currencies', { schema: 'public' })
export class Currencies {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @Column('character varying', { name: 'code', nullable: true })
  public code: string | null;

  @OneToMany(() => Accounts, (accounts) => accounts.currency)
  public accounts: Accounts[];

  @OneToMany(
    () => ExchangeRates,
    (exchangeRates) => exchangeRates.sourceCurrency
  )
  public exchangeRates: ExchangeRates[];

  @OneToMany(
    () => ExchangeRates,
    (exchangeRates) => exchangeRates.targetCurrency
  )
  public exchangeRates2: ExchangeRates[];

  @OneToMany(() => Settings, (settings) => settings.mainUrrency)
  public settings: Settings[];

  @OneToMany(() => Transactions, (transactions) => transactions.currency)
  public transactions: Transactions[];
}
