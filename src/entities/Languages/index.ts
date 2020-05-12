import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Settings } from '../Settings';

@Index('languages_pk', ['id'], { unique: true })
@Entity('Languages', { schema: 'public' })
export class Languages {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @Column('character varying', { name: 'code', nullable: false })
  public code: string;

  @OneToMany(() => Settings, settings => settings.language)
  public settings: Settings[];
}
