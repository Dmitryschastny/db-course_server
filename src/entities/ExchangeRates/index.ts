import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Currencies } from '../Currencies';
import { Transactions } from '../Transactions';

@Index('exchangerates_pk', ['id'], { unique: true })
@Entity('ExchangeRates', { schema: 'public' })
export class ExchangeRates {
  @Column('character varying', { name: 'rate', nullable: true })
  public rate: string | null;

  @Column('timestamp without time zone', {
    name: 'validFromDate',
    nullable: true,
  })
  public validFromDate: Date | null;

  @Column('timestamp without time zone', {
    name: 'validToDate',
    nullable: true,
  })
  public validToDate: Date | null;

  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @ManyToOne(() => Currencies, (currencies) => currencies.exchangeRates)
  @JoinColumn([{ name: 'sourceCurrency', referencedColumnName: 'id' }])
  public sourceCurrency: Currencies;

  @ManyToOne(() => Currencies, (currencies) => currencies.exchangeRates2)
  @JoinColumn([{ name: 'targetCurrency', referencedColumnName: 'id' }])
  public targetCurrency: Currencies;

  @OneToMany(() => Transactions, (transactions) => transactions.exchangeRate)
  public transactions: Transactions[];
}
