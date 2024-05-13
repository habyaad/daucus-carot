import { Repository } from 'typeorm';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionPlanRepository extends Repository<SubscriptionPlan> {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {
    super(
      subscriptionPlanRepository.target,
      subscriptionPlanRepository.manager,
      subscriptionPlanRepository.queryRunner,
    );
  }
}
