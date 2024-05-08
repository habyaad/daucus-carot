import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator";
import { UserType } from "src/common/enums";

export class ActivationDto{
    @IsEmail()
    @IsNotEmpty()
    @ValidateIf(o=>o.userType === UserType.Parent)
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @ValidateIf(o=>o.userType === UserType.Student)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,6, {message: "Code length must be 6"})
    code: string

    @IsEnum(UserType)
    @IsNotEmpty()
    userType: UserType
}