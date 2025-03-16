import { Injectable } from '@nestjs/common';
import { CreateSceneImageDto } from './dto/create-scene_image.dto';
import { UpdateSceneImageDto } from './dto/update-scene_image.dto';

@Injectable()
export class SceneImagesService {
  create(createSceneImageDto: CreateSceneImageDto) {
    return 'This action adds a new sceneImage';
  }

  findAll() {
    return `This action returns all sceneImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sceneImage`;
  }

  update(id: number, updateSceneImageDto: UpdateSceneImageDto) {
    return `This action updates a #${id} sceneImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} sceneImage`;
  }
}
