import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionRepository } from './subscription.repository';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionPlanService } from 'src/subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';
import { User } from 'src/common/entities/user.entity';
import { SubscriptionType } from 'src/common/enums';
import { ParentService } from 'src/parent/parent.service';
import { Parent } from 'src/parent/entities/parent.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { DataSource } from 'typeorm';
import { StringUtils } from 'src/common/helpers/string.utils';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly parentService: ParentService,
    private readonly walletService: WalletService,
    private readonly subscriptionPlanService: SubscriptionPlanService,
    private readonly dataSource: DataSource,
  ) {}
  async create(user: User, plan: SubscriptionPlan): Promise<Subscription> {
    const subscription: Subscription = new Subscription();
    subscription.user = user;
    subscription.plan = plan;
    subscription.dueDate = StringUtils.calculateDueDate(plan.type);

    await subscription.save();
    return subscription;
  }

  findAll() {
    return `This action returns all subscription`;
  }

  // async findOne(id: number): Promise<Subscription> {
  //   return await this.subscriptionRepository.findOneBy({ id });
  // }

  async findOneByUser(userId: string): Promise<Subscription> {
    const subscription: Subscription =
      await this.subscriptionRepository.findOneBy({ userId });

    if(!subscription){
      throw new NotFoundException("No subscription for user");
    }
    return subscription;
  }

  @Transactional()
  async purchaseSubscription(
    userId: string,
    subscriptionPlanId: number,
  ): Promise<Subscription> {
    let subscription: Subscription =
      await this.subscriptionRepository.findOneBy({ userId });
    const parent: Parent = await this.parentService.fetchById(userId);
    const subscriptionPlan: SubscriptionPlan =
      await this.subscriptionPlanService.findOne(subscriptionPlanId);
    if (subscription) {
      if (subscription.isActive() === true) {
        throw new BadRequestException('User has active subscription');
      } else {
        await this.walletService.debitWallet(parent.wallet, subscriptionPlan.price);

        subscription = await this.update(subscription, subscriptionPlan);
        if (parent.students.length > 0) {
          for (const student of parent.students) {
            await this.update(student.subscription, subscriptionPlan);
          }
        }
      }
    } else {
      await this.walletService.debitWallet(parent.wallet, subscriptionPlan.price);

      subscription = await this.create(parent, subscriptionPlan);
      if (parent.students.length > 0) {
        for (const student of parent.students) {
          await this.create(student, subscriptionPlan);
        }
      }
    }
    return subscription;
  }
  async update(
    subscription: Subscription,
    plan: SubscriptionPlan,
  ): Promise<Subscription> {
    subscription.plan = plan;
    subscription.dueDate = StringUtils.calculateDueDate(plan.type);
    await subscription.save();
    return subscription;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
