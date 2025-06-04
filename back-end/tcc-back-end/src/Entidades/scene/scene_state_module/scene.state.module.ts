import { Module } from '@nestjs/common';
import { SceneStateService } from './scene.state.service';
import { SceneStateGateway } from './scene.state.gateway';


@Module({
  providers: [SceneStateService, SceneStateGateway],
  exports: [SceneStateService],
})
export class SceneStateModule {}
