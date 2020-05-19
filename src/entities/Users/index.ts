import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Accounts } from '../Accounts';
import { Settings } from '../Settings';
import { Roles } from '../Roles';

@Index('users_pk', ['id'], { unique: true })
@Entity('Users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'email', nullable: true })
  public email: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  public password: string | null;

  @OneToOne(() => Settings, { cascade: true, nullable: false })
  @JoinColumn([{ name: 'settingsId', referencedColumnName: 'id' }])
  public settings: Settings;

  @OneToMany(() => Accounts, accounts => accounts.user)
  public accounts: Accounts[];

  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  @ManyToOne(() => Roles, role => role.user, { nullable: false })
  public role: Roles;
}
