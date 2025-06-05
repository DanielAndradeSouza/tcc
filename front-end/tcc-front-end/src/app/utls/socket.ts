import { io } from 'socket.io-client';

const socket = io('http://localhost:3050', {
  withCredentials: true, 
});

// Emitir estado da cena
export function saveSceneState(sceneId: string, state: any) {
  socket.emit('saveSceneState', { sceneId, state, senderId: socket.id });
}

// Solicitar estado atual da cena
export function requestSceneState(sceneId: string) {
  socket.emit('getSceneState', sceneId);
}

// Ouvir atualizações de uma cena específica
export function onSceneStateUpdated(sceneId: string, callback: (state: any) => void) {
  socket.on(`sceneStateUpdated:${sceneId}`, callback);
}

// Ouvir resposta de estado solicitado
export function onSceneState(sceneId: string, callback: (state: any) => void) {
  socket.on(`sceneState:${sceneId}`, callback);
}

export default  socket ;
