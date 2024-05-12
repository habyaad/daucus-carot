import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/common/enums';

export class VerifyTaskDto {
  @IsNotEmpty()
  @IsEnum([TaskStatus.Accepted, TaskStatus.Rejected], {message: "status must either be 'accepted' or 'rejected'"})
  status: TaskStatus;
}
