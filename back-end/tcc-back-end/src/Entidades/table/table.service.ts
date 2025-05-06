import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';
import { UserTable } from '../user_table/entities/user_table.entity';
import { User } from '../user/entities/user.entity';
import { CreateSceneDto } from '../scene/dto/create-scene.dto';
import { Scene } from '../scene/entities/scene.entity';

@Injectable()
export class TableService {
  constructor(@InjectRepository(Table) private tableRepository: Repository<Table>, 
  @InjectRepository(UserTable) private userTableRepository: Repository<UserTable>, 
  @InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Scene) private sceneRepository: Repository<Scene>){} 

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
  //Cria uma Cena
  async createScene(idTable:number, createSceneDto:CreateSceneDto):Promise<Scene>{
    const scene = this.sceneRepository.create(createSceneDto);
    const savedScene = this.sceneRepository.save(scene);
    return savedScene;
  }
  
  //Encontra todas as mesas do banco
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
  //Encontra todas as cenas da respectiva mesa
  async findAllScenes(idTable:number): Promise<Scene[]>{
    return await this.sceneRepository.find({where: {table: {id:idTable}}});
  }
  async findOne(userId: number) {
    return await this.tableRepository.findOne({where: {id:userId}});
  }

  async update(id: number, updateTableDto: UpdateTableDto):Promise<Table> {
    const table = await this.tableRepository.findOne({where : {id}});
    if(!table) throw new NotFoundException("Table Not Found");
    const updatedTable = this.tableRepository.merge(table, updateTableDto);
    return await this.tableRepository.save(updatedTable);
  }

/*  remove(id: number) {
    return `This action removes a #${id} table`;
  }*/
}
