import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/Entidades/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constrants';
import { JwtStrategy } from './jwt_strategy/jwt.srategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
