// src/auth/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//Criação de um decorador personalizado
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // ele fará uma request em http para poder acessar o usuário que está cadastrado na sessão
    // sempre quando esse decorador for usado, ele retornará o usuário em questão
    const request = context.switchToHttp().getRequest();
    //console.log(request.user);
    return request.user;
  },
);
