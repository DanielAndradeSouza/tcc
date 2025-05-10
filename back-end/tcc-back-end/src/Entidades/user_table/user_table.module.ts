import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTable } from './entities/user_table.entity';
import { UserTableService } from './user_table.service';
import { UserTableController } from './user_table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTable])], 
  providers: [UserTableService],
  controllers: [UserTableController],
  exports: [UserTableService],
})
export class UserTableModule {}
