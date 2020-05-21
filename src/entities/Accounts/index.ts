import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cards } from '../Cards';
import { Currencies } from '../Currencies';
import { AccountTypes } from '../AccountTypes';
import { Users } from '../Users';
import { Transactions } from '../Transactions';

@Index('accounts_pk', ['id'], { unique: true })
@Entity('Accounts', { schema: 'public' })
export class Accounts {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @Column('float', { name: 'balance', default: 0 })
  public balance: number;

  @ManyToOne(() => Cards, cards => cards.accounts, { nullable: true })
  @JoinColumn([{ name: 'cardId', referencedColumnName: 'id' }])
  public card: Cards | null;

  @ManyToOne(() => Currencies, currencies => currencies.accounts)
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  public currency: Currencies;

  @ManyToOne(() => AccountTypes, accountTypes => accountTypes.accounts)
  @JoinColumn([{ name: 'typeId', referencedColumnName: 'id' }])
  public type: AccountTypes;

  @ManyToOne(() => Users, users => users.accounts)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  public user: Users;

  @OneToMany(() => Transactions, transactions => transactions.account, {
    nullable: true,
  })
  public transactions: Transactions[] | null;
}
