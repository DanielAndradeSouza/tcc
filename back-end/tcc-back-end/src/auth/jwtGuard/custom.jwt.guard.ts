// src/auth/custom-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class CustomJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest<Request>();
    const token = await request.cookies?.['jwt'];
    //console.log(token);
    if (!token) throw new UnauthorizedException('Token ausente');

    try {
      const payload = await jwt.verify(token, process.env.JWT_SECRET!);
      request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
