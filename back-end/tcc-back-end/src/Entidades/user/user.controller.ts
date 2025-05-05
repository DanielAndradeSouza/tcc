import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './entities/user.entity';
import { CustomJwtGuard } from 'src/auth/jwtGuard/custom.jwt.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(CustomJwtGuard)
  @Get('findOne')
  async findOne(@CurrentUser() user: any) : Promise<User|null> {
    return await this.userService.findById(user.sub);
 
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
