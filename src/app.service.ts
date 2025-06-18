import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource} from 'typeorm';
import { Employee } from './entity/employee.entity';
import { ContactInfo } from './entity/contact-info.entity';
import { Task } from './entity/task.entity';
import { Meeting } from './entity/meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ){ }

  async seed() {
    await this.dataSource.transaction(async (db)=> {
      const ceo = db.create(Employee,{
        name: "Mr.Manuel",
      });
      await db.save(ceo);

      const contactInfoCEO =db.create(ContactInfo,{
        email: "ceo@lisbom.com",
        phone: "(82)94002-8922",
        employee: ceo,
      });
      await db.save(contactInfoCEO);

      const manager = db.create(Employee,{
        name: "marcos",
        manager:ceo,
      });

      await db.save(manager);

      
      const contactInfoManager =db.create(ContactInfo,{
        email: "manager@lisbom.com",
        phone: "(11)94002-8922",
        employee: manager,
      });

      await db.save(contactInfoManager);

      const  task1 = db.create(Task,{
        name: "hire people",
        assignee: manager,
      });

      const  task2 = db.create(Task,{
        name: "Present to CEO",
        assignee: manager,
      });

      await db.save([task1,task2]);

      const meeting = db.create(Meeting,{
        attendees: [ceo],
        zoomUrl: "http://zoom.us/123",
      });
      await db.save(meeting);

      meeting.attendees =  [ceo,manager];
      await db.save(meeting);

    });
  }
}
