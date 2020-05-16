import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../Categories';

@Index('icons_pk', ['id'], { unique: true })
@Entity('Icons', { schema: 'public' })
export class Icons {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('character varying', { name: 'name', nullable: true })
  public name: string | null;

  @OneToMany(() => Categories, categories => categories.icon)
  public categories: Categories[];
}
