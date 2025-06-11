import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'; // certo
import { Server, Socket } from 'socket.io';
import { SceneStateService } from './scene.state.service';
import { isUUID } from 'class-validator';

@WebSocketGateway({cors:{
  origin:'http://localhost:3000',
  methods:['GET','POST'],
  credentials:true
}})
export class SceneStateGateway{
    @WebSocketServer()
    server:Server;

    constructor(private readonly sceneStateService: SceneStateService) {}

  @SubscribeMessage('saveSceneState')
  async handleSaveSceneState(
    @MessageBody() data: { sceneId: string; newState: SceneState; senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log("Salvando Estado da Cena");
    await this.sceneStateService.saveSceneState(data.sceneId, data.newState);

    // Enviar para todos os outros sockets, exceto o que enviou
    this.server.sockets.sockets.forEach((socket) => {
      if (socket.id !== data.senderId) {
        socket.emit(`sceneStateUpdated:${data.sceneId}`, data.newState);
      }
    });
  }

  @SubscribeMessage('getSceneState')
  async handleGetSceneState(
    @MessageBody() sceneId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log("Procurando o Estado da Cena");
    const state = await this.sceneStateService.getSceneState(sceneId);
    client.emit(`sceneState:${sceneId}`, state);
  }
  @SubscribeMessage('deleteSceneState')
  async handleDeleteSceneState(
    @MessageBody() data: { sceneId: string; scene_imageId: string },
  ){
    
  }
}