import { Module } from '@nestjs/common';
import { SceneService } from './scene.service';
import { SceneController } from './scene.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scene } from './entities/scene.entity';
import { SceneImage } from '../scene_images/entities/scene_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scene,SceneImage])],
  controllers: [SceneController],
  providers: [SceneService],
})
export class SceneModule {}
