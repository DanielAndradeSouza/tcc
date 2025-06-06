import { Module } from '@nestjs/common';
import { SceneService } from './scene.service';
import { SceneController } from './scene.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { SceneImage } from '../scene_images/entities/scene_image.entity';
import { UserTableModule } from '../user_table/user_table.module';

@Module({
  imports: [TypeOrmModule.forFeature([Scene,SceneImage]),UserTableModule],
  controllers: [SceneController],
  providers: [SceneService],
  exports:[SceneService]
})
export class SceneModule {}
