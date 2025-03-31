import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTableService } from './user_table.service';
import { CreateUserTableDto } from './dto/create-user_table.dto';
import { UpdateUserTableDto } from './dto/update-user_table.dto';

@Controller('user-table')
export class UserTableController {
  constructor(private readonly userTableService: UserTableService) {}

  @Post()
  create(@Body() createUserTableDto: CreateUserTableDto) {
    return this.userTableService.create(createUserTableDto);
  }

  @Get()
  findAll() {
    return this.userTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTableDto: UpdateUserTableDto) {
    return this.userTableService.update(+id, updateUserTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTableService.remove(+id);
  }
}
