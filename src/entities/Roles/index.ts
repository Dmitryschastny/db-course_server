import { Users } from './../Users/index';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('roles_pk', ['id'], { unique: true })
@Entity('Roles', { schema: 'public' })
export class Roles {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Users, users => users.role)
  public user: Users[];
}
