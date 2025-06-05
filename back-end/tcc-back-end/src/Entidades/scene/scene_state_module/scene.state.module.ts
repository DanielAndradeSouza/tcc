import { Module } from '@nestjs/common';
import { SceneStateService } from './scene.state.service';
import { SceneStateGateway } from './scene.state.gateway';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports:[CacheModule.register({tll:300})],
  providers: [SceneStateService, SceneStateGateway],
  exports: [SceneStateService],
})
export class SceneStateModule {}
