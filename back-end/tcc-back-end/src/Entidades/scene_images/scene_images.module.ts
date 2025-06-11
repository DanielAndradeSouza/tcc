import { Module } from '@nestjs/common';
import { SceneImagesService } from './scene_images.service';
import { SceneImagesController } from './scene_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scene } from '../scene/entities/scene.entity';
import { SceneImage } from './entities/scene_image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Scene,SceneImage])],
  controllers: [SceneImagesController],
  providers: [SceneImagesService],
  exports:[SceneImagesService]
})
export class SceneImagesModule {}
