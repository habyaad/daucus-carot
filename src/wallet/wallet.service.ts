import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}
  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async findOneByUser(id: string): Promise<Wallet> {
    const wallet: Wallet = await this.walletRepository.findOne({
      where: { user: { id: id } },
    });
    if (!wallet) {
      throw new BadRequestException(`No wallet for user ID: ${id}`);
    }
    return wallet;
  }
  // async findOneByUserID(id: string): Promise<Wallet> {
  //   const wallet: Wallet = await this.walletRepository.findOneBy({
  //     userId: id,
  //   });
  //   if (!wallet) {
  //     throw new NotFoundException('Wallet not found for user');
  //   }
  //   return wallet;
  // }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async creditWallet(wallet: Wallet, amount: number): Promise<Wallet> {
    //const wallet: Wallet = await this.findOneByUserID(userId);
    if (amount < 500) {
      throw new BadRequestException('Amount should be at least 500');
    }
    wallet.balance += amount;
    await wallet.save();
    return wallet;
  }

  async debitWallet(wallet: Wallet, amount: number): Promise<Wallet> {
    //const wallet: Wallet = await this.findOneByUserID(userId);
    if (amount > wallet.balance) {
      throw new BadRequestException('Insufficient funds');
    }
    wallet.balance -= amount;
    await wallet.save();
    return wallet;
  }
}
