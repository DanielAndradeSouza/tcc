import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDTO: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.signIn(signInDTO.email, signInDTO.password);

    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8,
    });

    return { message: 'Login realizado com sucesso' };
  }
}
