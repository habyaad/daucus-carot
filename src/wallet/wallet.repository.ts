import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletRepository extends Repository<Wallet> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {
    super(
      walletRepository.target,
      walletRepository.manager,
      walletRepository.queryRunner,
    );
  }
}
