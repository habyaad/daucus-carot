import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction]), WalletModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports:[TransactionService]
})
export class TransactionModule {}
