import { Body, Controller, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt_strategy/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //@Res vai esperar uma resposta http, o passthrough permite a manipulação de tarefas especificas, como por exemplo manipular cookies
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() signInDTO: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.signIn(signInDTO.email, signInDTO.password);

    response.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // usa https em produção
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8, // 1 dia
    });

    return { message: 'Login realizado com sucesso' };
  }

}
