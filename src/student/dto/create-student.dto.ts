import {
  Equals,
  IsAlphanumeric,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from 'src/common/enums';
import { GenderType } from 'src/common/enums';
import { StringUtils } from 'src/common/helpers/string.utils';

export class CreateStudentDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(GenderType)
  gender: GenderType;

  // @IsNotEmpty()
  // @Equals(UserType.Student)
  // userType: UserType;

  @IsAlphanumeric()
  @Length(3, 20)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  @Length(10,10, {message: "Date format: yyyy-mm-dd"})
  //@MaxDate(new Date())
  dateOfBirth: string;
}
