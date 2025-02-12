import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { SubscriptionPlanService } from './subscription-plan.service';

@ApiTags('Subscription Plans')
@Controller('subscription-plan')
@ApiBearerAuth()
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body(ValidationPipe) createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlanService.create(createSubscriptionPlanDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<SubscriptionPlan[]>{
    return await this.subscriptionPlanService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ) : Promise<SubscriptionPlan>{
    return await this.subscriptionPlanService.update(+id, updateSubscriptionPlanDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.subscriptionPlanService.remove(+id);
  }
}
