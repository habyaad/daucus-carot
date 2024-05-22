import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DateColumn{
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}