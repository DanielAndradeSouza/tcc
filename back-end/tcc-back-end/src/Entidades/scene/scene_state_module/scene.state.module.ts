import { Module } from '@nestjs/common';
import { SceneStateService } from './scene.state.service';
import { SceneStateGateway } from './scene.state.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scene } from '../entities/scene.entity';
import { SceneService } from '../scene.service';
import { SceneModule } from '../scene.module';


@Module({
  imports:[CacheModule.register({tll:300}),SceneModule],
  providers: [SceneStateService, SceneStateGateway],
  exports: [SceneStateService],
})
export class SceneStateModule {}
