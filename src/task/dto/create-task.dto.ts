import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinDate } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(3,20)
  task: string;

  @IsNotEmpty()
  @IsString()
  @Length(3,100)
  description: string;

  @IsNumber()
  @IsOptional()
  reward: number;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  dueDate: string;

}