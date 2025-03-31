import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneImagesService } from './scene_images.service';
import { CreateSceneImageDto } from './dto/create-scene_image.dto';
import { UpdateSceneImageDto } from './dto/update-scene_image.dto';

@Controller('scene-images')
export class SceneImagesController {
  constructor(private readonly sceneImagesService: SceneImagesService) {}

  @Post()
  create(@Body() createSceneImageDto: CreateSceneImageDto) {
    return this.sceneImagesService.create(createSceneImageDto);
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
