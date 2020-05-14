import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Countries } from '../Countries';
import { Cards } from '../Cards';

@Index('banks_pk', ['id'], { unique: true })
@Entity('Banks', { schema: 'public' })
export class Banks {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @ManyToOne(() => Countries, countries => countries.banks)
  @JoinColumn([{ name: 'countryId', referencedColumnName: 'id' }])
  public country: Countries;

  @OneToMany(() => Cards, cards => cards.bank)
  public cards: Cards[];
}
