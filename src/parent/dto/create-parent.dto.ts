import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from 'src/common/enums';

export class CreateParentDto {
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
  @IsPhoneNumber("NG")
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
