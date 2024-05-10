import { Exclude } from "class-transformer";
import { BaseEntity, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class DateColumn{
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}