import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entidades/user/entities/user.entity';
import { Table } from './Entidades/table/entities/table.entity';
import { UserTable } from './Entidades/user_table/entities/user_table.entity';
import { Scene } from './Entidades/scene/entities/scene.entity';
import { SceneImage } from './Entidades/scene_images/entities/scene_image.entity';
import { UserModule } from './Entidades/user/user.module';
import { TableModule } from './Entidades/table/table.module';
import { UserTableModule } from './Entidades/user_table/user_table.module';
import { AuthModule } from './auth/auth.module';
import { SceneModule } from './Entidades/scene/scene.module';
import { SceneImagesModule } from './Entidades/scene_images/scene_images.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SceneStateModule } from './Entidades/scene/scene_state_module/scene.state.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: "mysql",   
      host: "localhost",
      port: 3306,  
      username: "root", 
      password: "Poney", 
      database: "VTT_RPG", 
      entities:[User,Table,UserTable,Scene,SceneImage],
      synchronize: true, 
      logging: true
  }),
  CacheModule.register(),
  SceneStateModule,
  UserModule,
  TableModule,
  SceneModule,
  SceneImagesModule,
  UserTableModule,
  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
