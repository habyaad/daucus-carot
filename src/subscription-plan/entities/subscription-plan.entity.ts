import { DateColumn } from "src/common/entities/date-column";
import { SubscriptionType } from "src/common/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({enum: SubscriptionType})
    type: SubscriptionType
    @Column()
    price: number
    @Column()
    maxNumberOfStudent: number
    @Column(() => DateColumn)
    dates: DateColumn
}
