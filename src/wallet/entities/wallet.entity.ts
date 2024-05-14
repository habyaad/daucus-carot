import { DateColumn } from 'src/common/entities/date-column';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({default:0})
  balance: number;
  @Column({default:0})
  points: number;
  @Column(() => DateColumn)
  dates: DateColumn;
}
