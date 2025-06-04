import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'; // certo
import { Server, Socket } from 'socket.io';
import { SceneStateService } from './scene.state.service';

@WebSocketGateway({cors:true})
export class SceneStateGateway{
    @WebSocketServer()
    server:Server;

    constructor(private readonly sceneStateService: SceneStateService) {}

    @SubscribeMessage('saveSceneState')
  handleSaveSceneState(
    @MessageBody() data: { sceneId: string; state: SceneState },
  ) {
    this.sceneStateService.saveSceneState(data.sceneId, data.state);
    // Emite o estado atualizado para todos os clientes conectados
    this.server.emit(`sceneStateUpdated:${data.sceneId}`, data.state);
  }
  @SubscribeMessage('getSceneState')
  handleGetSceneState(
    @MessageBody() sceneId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const state = this.sceneStateService.getSceneState(sceneId);
    client.emit(`sceneState:${sceneId}`, state);
  }
}