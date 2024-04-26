import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '996374',
    username: 'postgres',
    entities: [],
    database: 'daucus_carot',
    synchronize: true,
    logging: true,
  }), AuthModule, StudentModule, ParentModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
