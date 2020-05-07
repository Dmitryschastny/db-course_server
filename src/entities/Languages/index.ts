import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Settings } from '../Settings';

@Index('languages_pk', ['id'], { unique: true })
@Entity('Languages', { schema: 'public' })
export class Languages {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Settings, (settings) => settings.language)
  public settings: Settings[];
}
