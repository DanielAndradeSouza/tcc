import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneImage } from '../scene_images/entities/scene_image.entity';
import { Scene } from './entities/scene.entity';
import { UpdateSceneImageDto } from '../scene_images/dto/update-scene_image.dto';
import * as path from 'path';
import * as fs from 'fs';
import { TableService } from '../table/table.service';
@Injectable()
export class SceneService {
  constructor(@InjectRepository(Scene) private sceneRepository: Repository<Scene>,
  @InjectRepository(SceneImage) private sceneImageRepository: Repository<SceneImage>){}
  async createSceneImage(sceneId:number, createSceneImage:CreateSceneDto){
    const sceneImage = this.sceneImageRepository.create(createSceneImage);
    return await this.sceneImageRepository.save(sceneImage);
  }
  async findOne(id: number) {
    try{
      return await this.sceneRepository.findOne({where: {id}})
    }catch(e){
      throw new NotFoundException("Scene não encontrada!");
    }
  }

  async findAllSceneImage(idScene: number) {
    const data = await this.sceneImageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.scene', 'scene')
      .leftJoinAndSelect('scene.table', 'table')
      .leftJoinAndSelect(
        'table.usersTable',
        'usersTable',
        'usersTable.role = :role',
        { role: 'gm' }
      )
      .leftJoinAndSelect('usersTable.user', 'user')
      .where('scene.id = :sceneId', { sceneId: idScene })
      .getMany();

    if (!data || data.length === 0 || !data[0].scene?.table?.usersTable?.[0]?.user?.id) {
      throw new NotFoundException('Dados insuficientes para determinar o GM.');
    }

    const gmId = data[0].scene.table.usersTable[0].user.id;

    const gmDir = path.join('img', String(gmId));
    let files: string[] = [];

    try {
      files = fs.readdirSync(gmDir);
    } catch (err) {
      console.error('Erro ao ler diretório de imagens:', err);
      return data;
    }

    const getBase64Prefix = (filename: string) => {
      const ext = filename.split('.').pop()?.toLowerCase();
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          return 'data:image/jpeg;base64,';
        case 'png':
          return 'data:image/png;base64,';
        case 'gif':
          return 'data:image/gif;base64,';
        default:
          return 'data:image/octet-stream;base64,';
      }
    };

    const filesWithContent = files.map((filename) => {
      const filePath = path.join(gmDir, filename);
      const fileBuffer = fs.readFileSync(filePath);
      const base64Content = fileBuffer.toString('base64');
      const prefix = getBase64Prefix(filename);

      return {
        filename,
        base64Content: prefix + base64Content,
      };
    });

    const sceneImagesWithContent = data.map(sceneImage => {
      const file = filesWithContent.find(f => f.filename === sceneImage.image_url);
      return {
        ...sceneImage,
        base64Content: file ? file.base64Content : null,
      };
    });

    return sceneImagesWithContent.map(image => {
      const { scene, ...rest } = image;
      return rest;
    });
  }


  async update(id: number, updateSceneDto: UpdateSceneDto): Promise<Scene | null> {
    try{
      const scene = await this.sceneRepository.findOneOrFail({where: {id}});
      const updatedScene = await this.sceneRepository.merge(scene,updateSceneDto);
      console.log(updateSceneDto);
      return this.sceneRepository.save(updatedScene);
    }catch(e){
      throw new NotFoundException("Cena não encontrada!");
    }
  }
  async updateSceneImages(
    sceneId: number,
    updatedImages: UpdateSceneImageDto[],
  ): Promise<Scene> {
    const scene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['sceneImages'],
    });

    if (!scene) {
      throw new NotFoundException('Cena não encontrada');
    }

    for (const updatedImage of updatedImages) {
      const existingImage = scene.sceneImages.find(
        (img) => img.id === updatedImage.id,
      );

      if (!existingImage) {
        throw new NotFoundException(
          `Imagem com id ${updatedImage.id} não encontrada na cena`,
        );
      }
      Object.assign(existingImage, updatedImage);
    }
    await this.sceneImageRepository.save(scene.sceneImages);
    const updatedScene = await this.sceneRepository.findOne({
      where: { id: sceneId },
      relations: ['sceneImages'],
    });

    if (!updatedScene) {
      throw new NotFoundException('Cena não encontrada após atualização');
    }
    return updatedScene;
}
}
