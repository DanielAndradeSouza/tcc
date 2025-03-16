import { Module } from '@nestjs/common';
import { UserTableService } from './user_table.service';
import { UserTableController } from './user_table.controller';

@Module({
  controllers: [UserTableController],
  providers: [UserTableService],
})
export class UserTableModule {}
