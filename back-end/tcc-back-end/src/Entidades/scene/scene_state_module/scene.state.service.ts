import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { SceneService } from "../scene.service";
import { SceneImagesService } from "src/Entidades/scene_images/scene_images.service";
import { validate as isUUID } from "class-validator";

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
  async deleSceneState(sceneId:string,scene_imageId:string){
    const sceneState = await this.cacheManager.get<any[]>(sceneId);
    if (!Array.isArray(sceneState)) return;
    const removed_image = await this.findScene(sceneState,sceneId,scene_imageId);
    if(!removed_image) return;
    if(!isUUID(removed_image[0])){
      this.sceneImageService.delete(+scene_imageId);
    }
  }
  async findScene(sceneState:any,sceneId:string,scene_imageId:string){
    for(let i = 0; i < sceneState.length; i+=5){
      if (sceneState[i] === scene_imageId){
        const removed_image = sceneState.splice(i,5);
        await this.cacheManager.set(sceneId, sceneState);
        return removed_image;
      }
    }
  }
}
