import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPlan } from './entities/subscription-plan.entity';

@Injectable()
export class SubscriptionPlanRepository extends Repository<SubscriptionPlan> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {
    super(
      subscriptionPlanRepository.target,
      subscriptionPlanRepository.manager,
      subscriptionPlanRepository.queryRunner,
    );
  }
}
