import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

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
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;
  
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;
}
