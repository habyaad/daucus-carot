import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { SubscriptionPlanRepository } from './subscription-plan.repository';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}
  async create(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlan: SubscriptionPlan =
      this.subscriptionPlanRepository.create({
        ...createSubscriptionPlanDto,
      });
    await subscriptionPlan.save();
    return subscriptionPlan;
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.find();
  }

  async findOne(id: number): Promise<SubscriptionPlan> {
    try {
      const subscriptionPlan: SubscriptionPlan =
        await this.subscriptionPlanRepository.findOneBy({ id });
      if (!subscriptionPlan) {
        throw new NotFoundException(`Subscription plan ID: ${id} not found`);
      }
      return subscriptionPlan;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ) {
    try {
      const subscriptionPlan: SubscriptionPlan = await this.findOne(id);

      Object.assign(subscriptionPlan, updateSubscriptionPlanDto);

      return this.subscriptionPlanRepository.save(subscriptionPlan);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    const suscriptionPlan: SubscriptionPlan = await this.findOne(id);
    return await this.subscriptionPlanRepository.delete({ id });
  }
}
