// src/auth/custom-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class CustomJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.['jwt'];
    console.log(token);
    if (!token) throw new UnauthorizedException('Token ausente');

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      request.user = payload; // adiciona user manualmente
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
