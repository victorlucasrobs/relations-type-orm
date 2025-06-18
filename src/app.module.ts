import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { ContactInfo } from './entity/contact-info.entity';
import { Task } from './entity/task.entity';
import { Meeting } from './entity/meeting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo,Task,Meeting])
  ],
  providers: [AppService],
})
export class AppModule {}
