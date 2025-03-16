import { Injectable } from '@nestjs/common';
import { CreateUserTableDto } from './dto/create-user_table.dto';
import { UpdateUserTableDto } from './dto/update-user_table.dto';

@Injectable()
export class UserTableService {
  create(createUserTableDto: CreateUserTableDto) {
    return 'This action adds a new userTable';
  }

  findAll() {
    return `This action returns all userTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTable`;
  }

  update(id: number, updateUserTableDto: UpdateUserTableDto) {
    return `This action updates a #${id} userTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTable`;
  }
}
