import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { SceneService } from "../scene.service";
import { SceneImagesService } from "src/Entidades/scene_images/scene_images.service";
import { isUUID  } from "class-validator";

@Injectable()
export class SceneStateService {
  
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private readonly sceneService:SceneService,
            private readonly sceneImageService:SceneImagesService) {}

  async saveSceneState(sceneId: string, state: any) {
    //console.log("Estado da cena sendo salvo",state);
    await this.cacheManager.set(sceneId, state);
    const cachedState = await this.cacheManager.get(sceneId);
  }

  async getSceneState(sceneId: string): Promise<any | undefined> {
    const sceneState = await this.cacheManager.get(sceneId);
    console.log("Estado atual da cena:",sceneState);
    if (!sceneState) {
      //console.log("Estado da cena sendo buscado no banco");
      const sceneImages = await this.sceneService.findAllSceneImage(+sceneId);
      return sceneImages;
    }
    return sceneState; 
  }
  async deleteSceneState(sceneId:string,scene_imageId:string){
    const sceneState = await this.cacheManager.get<any[]>(sceneId);
    if (!Array.isArray(sceneState)) return;
    //console.log(sceneState);
    const removed_image = await this.findScene(sceneState,sceneId,scene_imageId);
    if(!removed_image) return;
    await this.cacheManager.set(sceneId, sceneState);
    console.log("Imagem a ser deletada::",removed_image.id);
    console.log(isUUID(removed_image.id));
    if(!isUUID(removed_image.id)){
      this.sceneImageService.delete(+scene_imageId);
    }
  }
  async findScene(sceneState:any,sceneId:string,scene_imageId:string){
    console.log('Buscando imagem com ID:', scene_imageId);
    console.log('Estado atual da cena (IDs):', sceneState.map(img => img.id));

    const index = sceneState.findIndex(img => String(img.id) === String(scene_imageId));

    if (index === -1) {
      console.warn('Imagem não encontrada na cena.');
      return null;
    }

    const [removed_image] = sceneState.splice(index, 1);
    await this.cacheManager.set(sceneId, sceneState);
    return removed_image;
  }
  async handleGmDisconnect(sceneId:number, tableId:number){
    console.log("Salvando dados da cena no banco: tableId: ", tableId);
    //O que precisa ser feito:
    //Buscar dados na cache de acordo com o sceneId
    //Buscar dados no banco de acordo com o sceneId
    //Pior parte: 
    //Comparar os resultados no banco com os que estão na cache, de acordo com os seguintes criteŕios:
    /*1.Se for UUiD, salva no banco. 2.Se não for UUid atualiza o valor no banco 3.Se tiver a ausencia de alguma imagem(feita verificação pelo id
    Deleta essa imagem no banco)*/
  }
}
