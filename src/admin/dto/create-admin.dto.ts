import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @MinLength(3, { message: 'first name must have atleast 3 characters.' })
    @IsNotEmpty()
    @MaxLength(20, { message: 'first name must have atmost 20 characters.' })
    firstName: string;
  
    @IsString()
    @MinLength(3, { message: 'last name must have atleast 3 characters.' })
    @IsNotEmpty()
    @MaxLength(20, { message: 'last name must have atmost 20 characters.' })
    lastName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsPhoneNumber('NG')
    phoneNumber: string;
  
    @IsNotEmpty()
    @IsString()
    secretKey: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
