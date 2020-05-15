import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Transactions } from '../Transactions';

@Index('transactiontypes_pk', ['id'], { unique: true })
@Entity('TransactionTypes', { schema: 'public' })
export class TransactionTypes {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Transactions, transactions => transactions.type)
  public transactions: Transactions[];
}
