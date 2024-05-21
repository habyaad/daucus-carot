import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    super(
      transactionRepository.target,
      transactionRepository.manager,
      transactionRepository.queryRunner,
    );
  }
}
