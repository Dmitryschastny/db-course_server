import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Languages } from '../Languages';
import { Currencies } from '../Currencies';
import { Users } from '../Users';

@Index('settings_pk', ['id'], { unique: true })
@Entity('Settings', { schema: 'public' })
export class Settings {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('boolean', { name: 'usePin', nullable: true })
  public usePin: boolean | null;

  @ManyToOne(() => Languages, (languages) => languages.settings)
  @JoinColumn([{ name: 'languageId', referencedColumnName: 'id' }])
  public language: Languages;

  @ManyToOne(() => Currencies, (currencies) => currencies.settings)
  @JoinColumn([{ name: 'mainСurrency', referencedColumnName: 'id' }])
  public mainUrrency: Currencies;

  @OneToMany(() => Users, (users) => users.settings)
  public users: Users[];
}
