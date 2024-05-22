import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { TransactionCategory } from 'src/common/enums';
import { StringUtils } from 'src/common/helpers/string.utils';
import { Parent } from 'src/parent/entities/parent.entity';
import { ParentService } from 'src/parent/parent.service';
import { SubscriptionPlan } from 'src/subscription-plan/entities/subscription-plan.entity';
import { SubscriptionPlanService } from 'src/subscription-plan/subscription-plan.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Transactional } from 'typeorm-transactional';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionRepository } from './subscription.repository';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly parentService: ParentService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}
  async create(
    user: User,
    plan: SubscriptionPlan,
    dueDate: Date,
  ): Promise<Subscription> {
    const subscription: Subscription = new Subscription();
    subscription.plan = plan;
    subscription.dueDate = dueDate;

    user.subscription = subscription;
    await user.save();
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
      await this.subscriptionRepository.findOne({
        where: { user: { id: userId } },
      });

    if (!subscription) {
      throw new NotFoundException('No subscription for user');
    }
    return subscription;
  }

  @Transactional()
  async purchaseSubscription(
    userId: string,
    subscriptionPlanId: number,
  ): Promise<Transaction> {
    let subscription: Subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId } },
    });
    const parent: Parent = await this.parentService.fetchById(userId);
    const subscriptionPlan: SubscriptionPlan =
      await this.subscriptionPlanService.findOne(subscriptionPlanId);
    const dueDate: Date = StringUtils.calculateDueDate(subscriptionPlan.type);
    if (subscription) {
      if (subscription.isActive() === true) {
        throw new BadRequestException('User has active subscription');
      } else {
        await this.walletService.debitWallet(
          parent.wallet,
          subscriptionPlan.price,
        );

        subscription = await this.update(
          parent,
          subscriptionPlan,
          dueDate,
        );
        if (parent.students.length > 0) {
          for (const student of parent.students) {
            await this.update(student, subscriptionPlan, dueDate);
          }
        }
      }
    } else {
      await this.walletService.debitWallet(
        parent.wallet,
        subscriptionPlan.price,
      );

      subscription = await this.create(parent, subscriptionPlan, dueDate);
      console.log(subscription);
      if (parent.students.length > 0) {
        for (const student of parent.students) {
          await this.create(student, subscriptionPlan, dueDate);
        }
      }
    }
    const transaction: Transaction = await this.transactionService.create({
      reference: StringUtils.generateTransactionReference(),
      amount: subscriptionPlan.price,
      category: TransactionCategory.Subscription,
      narration: StringUtils.generateNarration(
        TransactionCategory.Subscription,
        parent.firstName,
      ),
      user: parent,
    });
    return transaction;
  }
  async update(
    user: User,
    plan: SubscriptionPlan,
    dueDate: Date,
  ): Promise<Subscription> {
    user.subscription.plan = plan;
    user.subscription.dueDate = dueDate;
    await user.save();
    return user.subscription;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
