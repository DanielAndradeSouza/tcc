import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { UserTable } from '../user_table/entities/user_table.entity';
import { User } from '../user/entities/user.entity';
import { Scene } from '../scene/entities/scene.entity';
import { SceneService } from '../scene/scene.service';
import { SceneImage } from '../scene_images/entities/scene_image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table, UserTable, User,Scene,SceneImage]), 
  ],
  controllers: [TableController],
  providers: [TableService,SceneService],
})
export class TableModule {}
