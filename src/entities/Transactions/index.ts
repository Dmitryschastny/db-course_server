import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Categories } from '../Categories';
import { Currencies } from '../Currencies';
import { Places } from '../Places';
import { TransactionTypes } from '../TransactionTypes';
import { ExchangeRates } from '../ExchangeRates';

@Index('transactions_pk', ['id'], { unique: true })
@Entity('Transactions', { schema: 'public' })
export class Transactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('integer', { name: 'amount', nullable: true })
  public amount: number | null;

  @Column('character varying', { name: 'note', nullable: true })
  public note: string | null;

  @Column('timestamp without time zone', { name: 'date', nullable: true })
  public date: Date | null;

  @ManyToOne(() => Accounts, accounts => accounts.transactions)
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  public account: Accounts;

  @ManyToOne(() => Categories, categories => categories.transactions)
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  public category: Categories;

  @ManyToOne(() => Currencies, currencies => currencies.transactions)
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  public currency: Currencies;

  @ManyToOne(() => Places, places => places.transactions)
  @JoinColumn([{ name: 'placeId', referencedColumnName: 'id' }])
  public place: Places;

  @ManyToOne(
    () => TransactionTypes,
    transactionTypes => transactionTypes.transactions
  )
  @JoinColumn([{ name: 'typeId', referencedColumnName: 'id' }])
  public type: TransactionTypes;

  @ManyToOne(() => ExchangeRates, exchangeRates => exchangeRates.transactions)
  @JoinColumn([{ name: 'exchangeRateId', referencedColumnName: 'id' }])
  public exchangeRate: ExchangeRates;
}
