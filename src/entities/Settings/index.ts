import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Languages } from '../Languages';
import { Currencies } from '../Currencies';

@Index('settings_pk', ['id'], { unique: true })
@Entity('Settings', { schema: 'public' })
export class Settings {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('boolean', { name: 'usePin', nullable: true })
  public usePin: boolean | null;

  @Column('integer', { name: 'pin', nullable: true })
  public pin: number;

  @ManyToOne(() => Languages, languages => languages.settings)
  @JoinColumn([{ name: 'languageId', referencedColumnName: 'id' }])
  public language: Languages;

  @ManyToOne(() => Currencies, currencies => currencies.settings)
  @JoinColumn([{ name: 'mainCurrency', referencedColumnName: 'id' }])
  public mainCurrency: Currencies;
}
