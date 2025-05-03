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
    //Cria a mesa com os atributos distribuidos
    const table = this.tableRepository.create({...createTableDto,active:true, creation_date:new Date()});
    //Salva a mesa
    const savedTable = await this.tableRepository.save(table);
    //Procura se o usuário existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado, por favor logue em sua conta');
    }
    //Cria o relacionamento n por n
    const userTable = this.userTableRepository.create({
      user,
      table: savedTable,
      role: 'dm', 
    });
    //Salva
    await this.userTableRepository.save(userTable);

    return savedTable;
  }

  async findAll(userId: number): Promise<Table[]> {
    // Busca todos os userTable do usuário
    const userTables = await this.userTableRepository.find({
      where: { user: { id: userId } },
      relations: ['table'],
    });
    // E então de fato busca as mesas
    const tables = userTables.map(userTable => userTable.table);
    return tables;
  }
  

  findOne(userId: number) {
    return this.tableRepository.findOne({where: {id:userId}});
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
