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
  const fullPath = path.join(uploadDir, file.originalname);
  const savedImage = await this.sceneImagesService.create(fullPath,+sceneId);
  return { message: 'Arquivo salvo com sucesso!' };
}


  @Get()
  findAll() {
    return this.sceneImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneImageDto: UpdateSceneImageDto) {
    return this.sceneImagesService.update(+id, updateSceneImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneImagesService.remove(+id);
  }
}
