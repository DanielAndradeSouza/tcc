import { Injectable, UseGuards } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';
import { UserTable } from '../user_table/entities/user_table.entity';

@Injectable()
export class TableService {
  constructor(@InjectRepository(Table) private tableRepository: Repository<Table>, 
  @InjectRepository(UserTable) private userTableRepository: Repository<UserTable>){} 

  async create(createTableDto: CreateTableDto): Promise<Table>{
    const table = this.tableRepository.create({...createTableDto,active:true, creation_date:new Date()});
    return await this.tableRepository.save(table);
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
