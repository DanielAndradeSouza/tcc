import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/Entidades/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constrants';
import { PassportModule } from '@nestjs/passport';
import { UserTableModule } from 'src/Entidades/user_table/user_table.module';

@Module({
  imports: [
    UserModule,
    UserTableModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
