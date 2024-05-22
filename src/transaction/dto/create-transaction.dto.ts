import { User } from 'src/common/entities/user.entity';
import { TaskStatus, TransactionCategory } from 'src/common/enums';

export class CreateTransactionDto {
  reference: string;
  amount: number;
  category: TransactionCategory;
  reason?: string;
  narration: string;
  user: User;
}
