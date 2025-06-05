import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class SceneStateService {
  
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveSceneState(sceneId: string, state: any) {
    await this.cacheManager.set(sceneId, state);
    const cachedState = await this.cacheManager.get(sceneId);
    console.log('Estado salvo no cache:', cachedState);
  }

  async getSceneState(sceneId: string): Promise<any | undefined> {
    const sceneState = await this.cacheManager.get(sceneId);
    if (!sceneState) {
      return [];
    }
    return sceneState; 
  }

}
