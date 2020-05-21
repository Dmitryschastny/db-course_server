import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Settings } from '../Settings';
import { Transactions } from '../Transactions';

@Index('currencies_pk', ['id'], { unique: true })
@Entity('Currencies', { schema: 'public' })
export class Currencies {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @Column('character varying', { name: 'code', nullable: true })
  public code: string | null;

  @Column('float', { name: 'exchangeFactor', nullable: false })
  public exchangeFactor: number;

  @OneToMany(() => Accounts, accounts => accounts.currency)
  public accounts: Accounts[];

  @OneToMany(() => Settings, settings => settings.mainCurrency)
  public settings: Settings[];

  @OneToMany(() => Transactions, transactions => transactions.currency)
  public transactions: Transactions[];
}
