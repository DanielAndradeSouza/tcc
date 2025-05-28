import { Injectable, NotFoundException } from '@nestjs/common';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { SceneImage } from './entities/scene_image.entity';
import { Repository } from 'typeorm';
import { Scene } from '../scene/entities/scene.entity';
import { join } from 'path';
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

  async findAllByScene(idScene:number,userId:number) {
    try{
      return await this.sceneImageRepository.find({where: {scene: {id: idScene}}});      
    }catch(e){
      throw new NotFoundException("Erro ao carregar algum arquivo contido na Cena!");
    }
  }
  
  //Isso vai ser achado todos os arquivos do usuário
  async findAllFiles(sceneId:number,userId: number) {
    const userDir = `img/${userId}`;
    if (!existsSync(userDir)) {
      throw new NotFoundException('Usuário ou diretório não encontrado');
    }

    const files = readdirSync(userDir);

    if (files.length === 0) {
      throw new NotFoundException('Nenhum arquivo encontrado para esse usuário');
    }

    const filesWithContent = files.map((filename) => {
      const filePath = join(userDir, filename);
      const fileBuffer = readFileSync(filePath);
      const base64Content = fileBuffer.toString('base64');

      return {
        filename,
        base64Content,
      };
    });

    return filesWithContent;
  }
}
