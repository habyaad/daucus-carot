import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionPlanModule } from 'src/subscription-plan/subscription-plan.module';
import { ParentModule } from 'src/parent/parent.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports:[TypeOrmModule.forFeature([Subscription]), SubscriptionPlanModule, ParentModule, WalletModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository],
})
export class SubscriptionModule {}
