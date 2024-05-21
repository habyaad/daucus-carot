import * as bcrypt from 'bcrypt';
import { SubscriptionType } from '../enums';

export class StringUtils{
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
}
