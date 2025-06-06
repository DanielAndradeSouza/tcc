import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { SceneImagesService } from './scene_images.service';
import { UploadedFile } from '@nestjs/common';
import { UpdateSceneImageDto } from './dto/update-scene_image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';
import * as fs from 'fs';
import * as multer from 'multer';
import { CurrentUser } from 'src/auth/current-user.decorator';
import * as path from 'path';
import { CreateSceneImageDto } from './dto/create-scene_image.dto';
@Controller('scene_images')
export class SceneImagesController {
  constructor(private readonly sceneImagesService: SceneImagesService) {}

@Post(":id")
@UseGuards(CustomJwtGuard)
@UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
async create(@UploadedFile() file: Express.Multer.File,@CurrentUser() user: any, @Param("id") sceneId:string) {
  console.log('Arquivo na memória:', file.originalname);

  const userId = user.sub;
  const uploadDir = `img/${userId}`;
  await fs.mkdirSync(uploadDir, { recursive: true });
  await fs.writeFileSync(`${uploadDir}/${file.originalname}`, file.buffer);
  console.log(fs.readdirSync(uploadDir))
  return { message: 'Arquivo salvo com sucesso!' };
}
  @Post(':id/createOnTableTop')
  @UseGuards(CustomJwtGuard)
  async createOnTableTop(@Body() createSceneImageDto:CreateSceneImageDto,@Param('id') sceneId: string){
    
  }
  //Metodo utilizado para achar todas as referências de uma cena
  @Get(':id')
  @UseGuards(CustomJwtGuard)
  async findAllByScene(@Param('id') idScene: string, @CurrentUser() user: any) {
    return await this.sceneImagesService.findAllByScene(+idScene,user.sub);
  }

  @Get('findAllFiles/:id')
  @UseGuards(CustomJwtGuard)
  async findAllFiles(@Param('id') idscene: string,@CurrentUser() user:any) {
    return await this.sceneImagesService.findAllFiles(+idscene,user.sub);
  }
}
