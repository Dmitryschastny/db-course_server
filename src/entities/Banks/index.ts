import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Countries } from '../Countries';
import { Cards } from '../Cards';

@Index('banks_pk', ['id'], { unique: true })
@Entity('Banks', { schema: 'public' })
export class Banks {
  @Column('integer', { primary: true, name: 'id' })
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @ManyToOne(() => Countries, (countries) => countries.banks)
  @JoinColumn([{ name: 'countryId', referencedColumnName: 'id' }])
  public country: Countries;

  @OneToMany(() => Cards, (cards) => cards.bank)
  public cards: Cards[];
}
