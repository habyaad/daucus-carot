import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { UserType } from "src/common/enums";

export class LoginDto{
    @IsEmail({},{message:"email must be a valid address"})
    @IsNotEmpty()
    @ValidateIf(o=>o.userType === UserType.Parent)
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @ValidateIf(o=>o.userType === UserType.Student)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(UserType)
    @IsNotEmpty()
    userType: UserType
}