import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { SubscriptionPlanRepository } from './subscription-plan.repository';

@Module({
  imports:[TypeOrmModule.forFeature([SubscriptionPlan])],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService, SubscriptionPlanRepository],
  exports:[SubscriptionPlanService]
})
export class SubscriptionPlanModule {}
