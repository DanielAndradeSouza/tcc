import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  //JwtAuthGuard é uma função sendo exportada e que extende a AuthGuard do nest.js/passport
  @UseGuards(CustomJwtGuard)
  @Post('create')
  async createTable(@Body() dto: CreateTableDto, @CurrentUser() user: any) {
  console.log('Usuário autenticado:', user);
  return await this.tableService.create(dto, user.id);
}

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
