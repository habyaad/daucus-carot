import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class FundWalletDto {
  @IsNumber()
  @Min(500)
  @IsNotEmpty()
  amount: number;
}
