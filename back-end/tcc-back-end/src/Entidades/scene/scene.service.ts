import { Injectable } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneImage } from '../scene_images/entities/scene_image.entity';
import { Scene } from './entities/scene.entity';

@Injectable()
export class SceneService {
  constructor(@InjectRepository(Scene) private sceneRepository: Repository<Scene>,
  @InjectRepository(SceneImage) private sceneImageRepository: Repository<SceneImage>){}
  create(createSceneDto: CreateSceneDto) {
    return 'This action adds a new scene';
  }
  async createSceneImage(sceneId:number, createSceneImage:CreateSceneDto){
    const sceneImage = this.sceneImageRepository.create(createSceneImage);
    return await this.sceneImageRepository.save(sceneImage);
  }
  async findOne(id: number) {
    return await this.sceneRepository.findOne({where: {id}})
  }
  findAll() {
    return `This action returns all scene`;
  }

  async findAllSceneImage(idScene:number){
    return await this.sceneImageRepository.find({where:{scene: {id:idScene}}});
  }

  update(id: number, updateSceneDto: UpdateSceneDto) {
    return `This action updates a #${id} scene`;
  }

  remove(id: number) {
    return `This action removes a #${id} scene`;
  }
}
