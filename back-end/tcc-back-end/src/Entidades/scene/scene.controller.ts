import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SceneService } from './scene.service';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';

@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}
  @UseGuards(CustomJwtGuard)
  @Get(':id')
  async findScene(@Param('id') id:string){ 
    console.log(id);
    return await this.sceneService.findOne(+id);
  }
}
