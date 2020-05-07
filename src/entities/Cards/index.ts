import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Banks } from '../Banks';

@Index('cards_pk', ['id'], { unique: true })
@Entity('Cards', { schema: 'public' })
export class Cards {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'login', nullable: true })
  public login: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  public password: string | null;

  @OneToMany(() => Accounts, (accounts) => accounts.card)
  public accounts: Accounts[];

  @ManyToOne(() => Banks, (banks) => banks.cards)
  @JoinColumn([{ name: 'bankId', referencedColumnName: 'id' }])
  public bank: Banks;
}
