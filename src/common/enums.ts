export enum GenderType {
  Male = 'male',
  Female = 'female',
}
export enum UserType {
  Parent = 'parent',
  Student = 'student',
  Admin = 'admin',
}
export enum PostgresErrorCode {
  UniqueColumnDuplicateErrorCode = 23505,
}
export enum TaskStatus {
  New = 'new',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Expired = 'expired',
}
export enum SubscriptionType {
  Monthly = 'monthly',
  Yearly = 'yearly',
}
export enum TransactionType {
  Credit = 'credit',
  Debit = 'debit',
}
export enum TransactionCategory {
  Funding = 'funding',
  Subscription = 'subscription',
  Transfer = 'transfer',
  Receipt = 'receipt'

}
export enum TransactionStatus {
  Success = 'success',
  Pending = 'pending',
  Failed = 'failed',
}