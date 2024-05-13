import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { SubscriptionType } from "src/common/enums"

export class CreateSubscriptionPlanDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEnum(SubscriptionType)
    @IsNotEmpty()
    type: SubscriptionType

    @IsNotEmpty()
    @IsNumber()
    price: number
    
    @IsNotEmpty()
    @IsNumber()
    @Max(5)
    @Min(1)
    maxNumberOfStudent: number
}
