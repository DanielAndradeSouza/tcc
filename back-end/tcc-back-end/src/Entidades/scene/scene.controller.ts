import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SceneService } from './scene.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';

@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post('create')
  create(@Body() createSceneDto: CreateSceneDto) {
    return this.sceneService.create(createSceneDto);
  }
  @UseGuards(CustomJwtGuard)
  @Post(':id/image_scene')
  async createImageScene(idScene:number,createSceneDto:CreateSceneDto){
    return await this.sceneService.createSceneImage(idScene,createSceneDto)
  }
  
  @UseGuards(CustomJwtGuard)
  @Get(':id/image_scene')
  async findAllImageScenes(idTable:number){
    //Busca das ImageScenes
  }
  @Get()
  findAll() {
    return this.sceneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.sceneService.update(+id, updateSceneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneService.remove(+id);
  }
}
