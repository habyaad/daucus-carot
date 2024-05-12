import { UserType } from 'src/common/enums';

export class UserResponseDto {
  id: string;

  firstName: string;

  lastName: string;

  userType: UserType;
}
