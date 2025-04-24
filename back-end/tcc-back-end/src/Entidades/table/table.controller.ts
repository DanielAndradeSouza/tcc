import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt_strategy/auth.guard';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  //JwtAuthGuard é uma função sendo exportada e que extende a AuthGuard do nest.js/passport
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTable(@Body() dto: CreateTableDto, @CurrentUser() user: any) {
    console.log(user);
    return this.tableService.create(dto,user.id);
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
