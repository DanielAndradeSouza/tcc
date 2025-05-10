import { Injectable } from '@nestjs/common';
import { CreateUserTableDto } from './dto/create-user_table.dto';
import { UpdateUserTableDto } from './dto/update-user_table.dto';
import { Repository } from 'typeorm';
import { UserTable } from './entities/user_table.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTableService {
  constructor(@InjectRepository(UserTable) private userTableRepository: Repository<UserTable>){}
  create(createUserTableDto: CreateUserTableDto) {
    return 'This action adds a new userTable';
  }

  findAll() {
    return `This action returns all userTable`;
  }

  async findOne(userId: number,tableId) {
    return await this.userTableRepository.findOne({where: {user: {id: userId}, table: {id:tableId}}});
  }

  update(id: number, updateUserTableDto: UpdateUserTableDto) {
    return `This action updates a #${id} userTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTable`;
  }
}
