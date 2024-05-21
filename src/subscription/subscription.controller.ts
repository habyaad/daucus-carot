import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { User } from 'src/common/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @Roles('parent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @GetUser() parent,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.purchaseSubscription(
      parent.id,
      createSubscriptionDto.subscriptionPlanId,
    );
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   //return this.subscriptionService.findOne(+id);
  // }

  @Get('/me')
  @Roles('parent','student')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneForUser(@GetUser() user: User) {
    return await this.subscriptionService.findOneByUser(user.id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    //return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
