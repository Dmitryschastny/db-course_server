import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transactions } from '../Transactions';

@Index('places_pk', ['id'], { unique: true })
@Entity('Places', { schema: 'public' })
export class Places {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Transactions, transactions => transactions.place)
  public transactions: Transactions[];
}
