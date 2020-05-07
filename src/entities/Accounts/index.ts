import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cards } from '../Cards';
import { Currencies } from '../Currencies';
import { AccountTypes } from '../AccountTypes';
import { Users } from '../Users';
import { Transactions } from '../Transactions';

@Index('accounts_pk', ['id'], { unique: true })
@Entity('Accounts', { schema: 'public' })
export class Accounts {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('integer', { name: 'balance', nullable: true })
  public balance: number | null;

  @Column('boolean', { name: 'archived', nullable: true })
  public archived: boolean | null;

  @ManyToOne(() => Cards, (cards) => cards.accounts)
  @JoinColumn([{ name: 'cardId', referencedColumnName: 'id' }])
  public card: Cards;

  @ManyToOne(() => Currencies, (currencies) => currencies.accounts)
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  public currency: Currencies;

  @ManyToOne(() => AccountTypes, (accountTypes) => accountTypes.accounts)
  @JoinColumn([{ name: 'typeId', referencedColumnName: 'id' }])
  public type: AccountTypes;

  @ManyToOne(() => Users, (users) => users.accounts)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  public user: Users;

  @OneToMany(() => Transactions, (transactions) => transactions.account)
  public transactions: Transactions[];
}
