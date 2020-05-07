import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Categories } from '../Categories';

@Index('icons_pk', ['id'], { unique: true })
@Entity('Icons', { schema: 'public' })
export class Icons {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'path', nullable: true })
  public path: string | null;

  @OneToMany(() => Categories, (categories) => categories.icon)
  public categories: Categories[];
}
