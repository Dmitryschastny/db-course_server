import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Icons } from '../Icons';
import { Transactions } from '../Transactions';
import { TransactionTypes } from '../TransactionTypes';

@Index('categories_pk', ['id'], { unique: true })
@Entity('Categories', { schema: 'public' })
export class Categories {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @ManyToOne(() => Icons, icons => icons.categories, { nullable: true })
  @JoinColumn([{ name: 'iconId', referencedColumnName: 'id' }])
  public icon: Icons | null;

  @ManyToOne(
    () => TransactionTypes,
    transactionTypes => transactionTypes.transactions
  )
  @JoinColumn([{ name: 'transactionTypeId', referencedColumnName: 'id' }])
  public transactionType: TransactionTypes;

  @OneToMany(() => Transactions, transactions => transactions.category)
  public transactions: Transactions[];
}
