import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SceneService } from './scene.service';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { Scene } from './entities/scene.entity';
import { UpdateSceneImageDto } from '../scene_images/dto/update-scene_image.dto';
import { CreateSceneDto } from './dto/create-scene.dto';

@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}
  @UseGuards(CustomJwtGuard)
  @Get(':id')
  async findOne(@Param('id') id:string){ 
    console.log(id);
    return await this.sceneService.findOne(+id);
  }
  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  async update(@Param('id') id:string, @Body() UpdateSceneDto: UpdateSceneDto){
    return await this.sceneService.update(+id,UpdateSceneDto);
  }
  @Put(':id/updateImages')
  async updateImages(
    @Param('id') id: string,
    @Body() images: UpdateSceneImageDto[],
  ) {
    console.log(images);
    return this.sceneService.updateSceneImages(+id, images);
  }
}
