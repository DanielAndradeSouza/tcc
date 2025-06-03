import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';
import { CreateSceneDto } from '../scene/dto/create-scene.dto';

@Controller('table')
export class TableController {
  //Metodos organizados da seguinte forma, primeiro são os metodos da Table, e depois da Table em relação a Scene
  constructor(private readonly tableService: TableService) {}
  //JwtAuthGuard é uma função sendo exportada e que extende a AuthGuard do nest.js/passport
  @UseGuards(CustomJwtGuard)
  @Post('create')
  async createTable(@Body() dto: CreateTableDto, @CurrentUser() user: any) {
  console.log('Usuário autenticado:', user);
  return await this.tableService.create(dto, user.sub);
  }

  @UseGuards(CustomJwtGuard)
  @Get('findAll')
  async findAll(@CurrentUser() user:any) {
    console.log(user.sub);
    return await this.tableService.findAll(user.sub);
  }

  @UseGuards(CustomJwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tableService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return await this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tableService.remove(+id);
  }
  @UseGuards(CustomJwtGuard)
  @Post(':id/scene')
  async createScene(@Param('id') idTable:number,createSceneDto:CreateSceneDto){
    // Criação da Cena
    const scene = this.tableService.createScene(idTable,createSceneDto);
  }
  @UseGuards(CustomJwtGuard)
  @Get(':id/scene')
  async findAllScenes(@Param('id') idTable:number){
    return this.tableService.findAllScenes(idTable);
  }
  @UseGuards(CustomJwtGuard)
  @Get(':id/gmscene')
  async findGmScene(@Param('id') idTable:string){
    return await this.tableService.findGmScene(+idTable);
  }

  @UseGuards(CustomJwtGuard)
  @Get(':id/playerscene')
  async findPlayerScene(@Param('id') idTable:string){
    return await this.tableService.findPlayerScene(+idTable);
  }
  @UseGuards(CustomJwtGuard)
  @Get('join/:id')
  async join(@Param('id') idTable:string, @CurrentUser() user:any){
    return await this.tableService.join(+idTable,user.sub);
  }
}
