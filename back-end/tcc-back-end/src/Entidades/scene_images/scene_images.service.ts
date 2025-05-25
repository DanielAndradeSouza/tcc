import { Injectable } from '@nestjs/common';
import { CreateSceneImageDto } from './dto/create-scene_image.dto';
import { UpdateSceneImageDto } from './dto/update-scene_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SceneImage } from './entities/scene_image.entity';
import { Repository } from 'typeorm';
import { Scene } from '../scene/entities/scene.entity';

@Injectable()
export class SceneImagesService {
  constructor(@InjectRepository(SceneImage) private readonly sceneImageRepository: Repository<SceneImage>, 
  @InjectRepository(Scene) private readonly sceneRepository: Repository<Scene>){}
  async create(path:string, sceneId:number) {
    const scene = await this.sceneRepository.findOneBy({ id: sceneId });
    if (!scene) {
      throw new Error('Cena não encontrada'); // pode criar uma exceção customizada aqui
    }
    const sceneImage = this.sceneImageRepository.create({
      image_url: path,
      scene: scene, 
    });

    return await this.sceneImageRepository.save(sceneImage);

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
