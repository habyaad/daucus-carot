import { Injectable } from '@nestjs/common';
import {
  TransactionCategory,
  TransactionStatus,
  TransactionType,
} from 'src/common/enums';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { User } from 'src/common/entities/user.entity';
import { StringUtils } from 'src/common/helpers/string.utils';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletService: WalletService,
  ) {}
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction: Transaction = new Transaction();
    transaction.reference = createTransactionDto.reference;
    transaction.reason = createTransactionDto.reason;
    transaction.status = TransactionStatus.Success;
    transaction.amount = createTransactionDto.amount;
    transaction.category = createTransactionDto.category;
    transaction.transactionType =
      createTransactionDto.category === TransactionCategory.Funding ||
      TransactionCategory.Receipt
        ? TransactionType.Credit
        : TransactionType.Debit;
    transaction.narration = createTransactionDto.narration;
    transaction.user = createTransactionDto.user;
    console.log(transaction);
    await transaction.save();
    return transaction;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
  async fetchUserTransactions(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
  @Transactional()
  async fundWallet(user: User, amount: number) {
    await this.walletService.creditWallet(user.wallet, amount);
    const transaction: Transaction = await this.create({
      reference: StringUtils.generateTransactionReference(),
      amount: amount,
      category: TransactionCategory.Funding,
      narration: StringUtils.generateNarration(
        TransactionCategory.Funding,
        user.firstName,
      ),
      user: user,
    });
    return transaction;
  }
}
