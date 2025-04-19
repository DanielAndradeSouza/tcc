import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { UserTableController } from '../user_table/user_table.controller';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService, private userTableController: UserTableController) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTable(@Body() dto: CreateTableDto, @CurrentUser() user: any) {
    console.log(user.id); // aqui você acessa direto o ID do usuário autenticado
    return this.tableService.create(dto, user.id);
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
