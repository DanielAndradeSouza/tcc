import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

@Injectable()
export class CustomSocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const customOptions: Partial<ServerOptions> = {
      ...options,
      maxHttpBufferSize: 10e6, // 10 MB (padrão é 1 MB = 1e6)
    };
    return super.createIOServer(port, customOptions);
  }
}
