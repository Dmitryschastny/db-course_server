import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Settings } from '../Settings';

@Index('users_pk', ['id'], { unique: true })
@Entity('Users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'email', nullable: true })
  public email: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  public password: string | null;

  @OneToOne(() => Settings, { cascade: true })
  @JoinColumn([{ name: 'settingsId', referencedColumnName: 'id' }])
  public settings: Settings;

  //
  @OneToMany(() => Accounts, accounts => accounts.user)
  public accounts: Accounts[];
}
