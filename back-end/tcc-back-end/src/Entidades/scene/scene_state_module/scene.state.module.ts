import { Module } from '@nestjs/common';
import { SceneStateService } from './scene.state.service';
import { SceneStateGateway } from './scene.state.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { SceneModule } from '../scene.module';
import { SceneImagesModule } from 'src/Entidades/scene_images/scene_images.module';


@Module({
  imports:[CacheModule.register(),SceneModule,SceneImagesModule],
  providers: [SceneStateService, SceneStateGateway],
  exports: [SceneStateService],
})
export class SceneStateModule {}
