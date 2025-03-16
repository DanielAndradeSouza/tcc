import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    username:"root",
    password:"Poney2507@!",
    database:"VTT_RPG",
    entities:['dist/**/*.entity.ts'],
    synchronize:true,
  }),UserModule] ,
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
