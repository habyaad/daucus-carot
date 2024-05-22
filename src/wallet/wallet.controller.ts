import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/common/entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('wallet')
@ApiBearerAuth()
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @Post()
  // create(@Body() createWalletDto: CreateWalletDto) {
  //   return this.walletService.create(createWalletDto);
  // }

  // @Get()
  // findAll() {
  //   return this.walletService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.walletService.findOne(+id);
  // }
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findOne(@GetUser() user:User):Promise<Wallet>  {
    return await this.walletService.findOneByUser(user.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
  //   return this.walletService.update(+id, updateWalletDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.walletService.remove(+id);
  // }
}
