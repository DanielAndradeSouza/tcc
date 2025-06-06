import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { SceneService } from "../scene.service";

@Injectable()
export class SceneStateService {
  
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,private readonly sceneService:SceneService) {}

  async saveSceneState(sceneId: string, state: any) {
    console.log("Estado sendo feito na Cena")
    await this.cacheManager.set(sceneId, state);
    console.log(sceneId)
    const cachedState = await this.cacheManager.get(sceneId);
  }

  async getSceneState(sceneId: string): Promise<any | undefined> {
    const sceneState = await this.cacheManager.get(sceneId);
    if (!sceneState) {
      const sceneImages = await this.sceneService.findAllSceneImage(+sceneId);
      return sceneImages;
    }
    return sceneState; 
  }

}
