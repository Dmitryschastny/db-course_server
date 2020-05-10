import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Settings } from '../Settings';

@Index('users_pk', ['id'], { unique: true })
@Entity('Users', { schema: 'public' })
export class Users {
  @Column('integer', {
    primary: true,
    unique: true,
    generated: 'increment',
    name: 'id',
  })
  public id: number;

  @Column('character varying', { name: 'email', nullable: true })
  public email: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  public password: string | null;

  @Column('integer', { name: 'pin', nullable: true })
  public pin: number | null;

  @OneToMany(() => Accounts, (accounts) => accounts.user)
  public accounts: Accounts[];

  @ManyToOne(() => Settings, (settings) => settings.users)
  @JoinColumn([{ name: 'settingsId', referencedColumnName: 'id' }])
  public settings: Settings;
}
