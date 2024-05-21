import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionRepository extends Repository<Subscription> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {
    super(
      subscriptionRepository.target,
      subscriptionRepository.manager,
      subscriptionRepository.queryRunner,
    );
  }
}
