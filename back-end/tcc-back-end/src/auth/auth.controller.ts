import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CustomJwtGuard } from './jwtGuard/custom.jwt.guard';
import { CurrentUser } from './current-user.decorator';

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
  @UseGuards(CustomJwtGuard)
  @Get('profile/:id')
  async getProfile(
    @CurrentUser() user: any,
    @Param('id') tableId: string,
  ) {
    return await this.authService.getProfile(user.sub, +tableId);
  }
  @UseGuards(CustomJwtGuard)
  @Post('logout')
  async logout(@Res() res:Response){
    res.cookie('jwt','',{
      httpOnly:true,
      expires:new Date(0),
      path:'/'
    })
    return res.status(200).json({message:"Logout Realizado com Sucesso"})
  }
}
