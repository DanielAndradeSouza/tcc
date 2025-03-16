import { Module } from '@nestjs/common';
import { SceneImagesService } from './scene_images.service';
import { SceneImagesController } from './scene_images.controller';

@Module({
  controllers: [SceneImagesController],
  providers: [SceneImagesService],
})
export class SceneImagesModule {}
