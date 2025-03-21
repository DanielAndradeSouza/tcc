import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entidades/user/entities/user.entity';
import { Table } from './Entidades/table/entities/table.entity';
import { UserTable } from './Entidades/user_table/entities/user_table.entity';
import { ChatMessage } from './Entidades/chat_messages/entities/chat_message.entity';
import { Scene } from './Entidades/scene/entities/scene.entity';
import { SceneImage } from './Entidades/scene_images/entities/scene_image.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: "mysql",   
      host: "localhost",
      port: 3306,  
      username: "root", 
      password: "Poney2507@!", 
      database: "VTT_RPG", 
      entities:[User,Table,UserTable,ChatMessage,Scene,SceneImage],
      synchronize: true, 
      logging: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
