import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Accounts } from '../Accounts';

@Index('accounttypes_pk', ['id'], { unique: true })
@Entity('AccountTypes', { schema: 'public' })
export class AccountTypes {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Accounts, accounts => accounts.type)
  public accounts: Accounts[];
}
