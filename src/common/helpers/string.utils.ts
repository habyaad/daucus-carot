import * as bcrypt from 'bcrypt';
import { SubscriptionType, TransactionCategory } from '../enums';

export class StringUtils {
  static generateActivationCode(): string {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  static getFourteenYearsAgoDate(): Date {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 14);
    console.log(minDate);
    return minDate;
  }
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static calculateDueDate(planType: SubscriptionType): Date {
    const today: Date = new Date();
    if (planType === SubscriptionType.Monthly) {
      today.setMonth(today.getMonth() + 1);
    } else if (planType === SubscriptionType.Yearly) {
      today.setFullYear(today.getFullYear() + 1);
    }
    return today;
  }
  static generateTransactionReference(): string {
    // Generate a unique transaction reference, e.g., using a UUID or a custom scheme
    return 'TXN-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }
  static generateNarration(
    type: TransactionCategory,
    username: string,
  ): string {
    if (type === TransactionCategory.Funding) {
      return `Funding account for ${username}`;
    } else if (type === TransactionCategory.Subscription) {
      return `Subscription of account for ${username}`;
    } else if (type === TransactionCategory.Transfer) {
      return `Transferred money to ${username}`;
    } else {
      return `Received money from ${username}`;
    }
  }
}
