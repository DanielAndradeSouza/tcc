import { Injectable, UseGuards } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';
import { UserTable } from '../user_table/entities/user_table.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TableService {
  constructor(@InjectRepository(Table) private tableRepository: Repository<Table>, 
  @InjectRepository(UserTable) private userTableRepository: Repository<UserTable>, 
  @InjectRepository(User) private userRepository: Repository<User>){} 

  async create(createTableDto: CreateTableDto, userId: number): Promise<Table>{
    const table = this.tableRepository.create({...createTableDto,active:true, creation_date:new Date()});
    const savedTable = await this.tableRepository.save(table);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado, por favor logue em sua conta');
    }
    const userTable = this.userTableRepository.create({
      user,
      table: savedTable,
      role: 'gm', 
    });
    await this.userTableRepository.save(userTable);

    return savedTable;
  }

  findAll() {
    return `This action returns all table`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
