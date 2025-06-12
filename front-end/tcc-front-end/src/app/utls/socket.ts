import { io } from 'socket.io-client';

const socket = io('http://localhost:3050', {
  withCredentials: true, 
});

// Emitir estado da cena
export function saveSceneState(sceneId: string, state: any) {
  console.log("Salvando estado!");
  socket.emit('saveSceneState', { sceneId, state, senderId: socket.id });
}

// Solicitar estado atual da cena
export function requestSceneState(sceneId: string) {
  console.log("Procurando Estado!");
  socket.emit('getSceneState', sceneId);
}

// Ouvir atualizações de uma cena específica
export function onSceneStateUpdated(sceneId: string, callback: (state: any) => void) {
  console.log("Recenbendo Estado de Atualização!");
  socket.on(`sceneStateUpdated:${sceneId}`, callback);
}

// Ouvir resposta de estado solicitado
export function onSceneState(sceneId: string, callback: (state: any) => void) {
  console.log("Recenbendo Estado Requerido!");
  socket.on(`sceneState:${sceneId}`, callback);
}

export function deleteSceneImage(sceneId: string, sceneImageId: string) {
  console.log("Solicitando exclusão de imagem da cena...");
  socket.emit('deleteSceneImage', { sceneId, sceneImageId, senderId: socket.id });
}
export default  socket ;
