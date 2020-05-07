import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Transactions } from '../Transactions';

@Index('places_pk', ['id'], { unique: true })
@Entity('Places', { schema: 'public' })
export class Places {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @Column('character varying', { name: 'location', nullable: true })
  public location: string | null;

  @OneToMany(() => Transactions, (transactions) => transactions.place)
  public transactions: Transactions[];
}
