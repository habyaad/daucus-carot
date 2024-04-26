import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';

@Module({
  controllers: [ParentController],
  providers: [ParentService],
  exports:[ParentService],
  imports:[TypeOrmModule.forFeature([Parent])]
})
export class ParentModule {}
