import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Banks } from '../Banks';

@Index('countries_pk', ['id'], { unique: true })
@Entity('Countries', { schema: 'public' })
export class Countries {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Banks, (banks) => banks.country)
  public banks: Banks[];
}
