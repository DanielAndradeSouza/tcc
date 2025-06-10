import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
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

async create(createTableDto: CreateTableDto, userId: number): Promise<Table> {
  const table = this.tableRepository.create({
    ...createTableDto,
    creation_date: new Date(),
  });

  const savedTable = await this.tableRepository.save(table);

  const initialScene = this.sceneRepository.create({
    table: savedTable,
  });

  await this.sceneRepository.save(initialScene);

  savedTable.sceneAtualGM = initialScene;
  savedTable.sceneAtualPlayers = initialScene;
  await this.tableRepository.save(savedTable);

  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuário não encontrado, por favor logue em sua conta');

  const userTable = this.userTableRepository.create({
    user,
    table: savedTable,
    role: 'gm',
  });

  await this.userTableRepository.save(userTable);

  return savedTable;
}


async createScene(idTable: number, createSceneDto: CreateSceneDto): Promise<Scene> {
  const scene =  this.sceneRepository.create(createSceneDto);

  scene.table = { id: idTable } as any; 

  const savedScene = await this.sceneRepository.save(scene);

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
  //Procura a mesa pelo id
  async findOne(userId: number) {
    return await this.tableRepository.findOne({where: {id:userId}});
  }
  async players(tableId: number) {
    try{
      const userTables = await this.userTableRepository.find({
        where: { table: { id: tableId } },
        relations: ['user'],
      });

      const users = userTables.map(ut => ut.user);
      return users;
    }catch(e){
      throw new InternalServerErrorException("Erro ao resgatar os usuários!");
    }
  }
  
  async findGmScene(tableId:number){
    try{
      const table = await this.tableRepository.findOne({where:{id:tableId}, relations:['sceneAtualGM']})
      const sceneAtual = table?.sceneAtualGM.id;
      return sceneAtual
    }catch(e){
      throw new NotFoundException("Cena do Game Master não encontrada!");
    }
  }
  async findPlayerScene(tableId:number){
    try{
      const table = await this.tableRepository.findOne({where:{id:tableId}, relations:['sceneAtualPlayers']})
      const sceneId = table?.sceneAtualPlayers.id;
      return sceneId
    }catch(e){
      throw new NotFoundException("Cena dos Players não encontrada!");
    }
  }
  async update(id: number, updateTableDto: UpdateTableDto):Promise<Table> {
    const table = await this.tableRepository.findOne({where : {id}});
    if(!table) throw new NotFoundException("Table Not Found");
    const updatedTable = this.tableRepository.merge(table, updateTableDto);
    return await this.tableRepository.save(updatedTable);
  }
s
  async remove(id: number) {
    console.log(id);
    return await this.tableRepository.delete(id)
  }
  async join(idTable: number, idUser: number) {
  try {
    const table = await this.tableRepository.findOne({ where: { id: idTable } });
    const user = await this.userRepository.findOne({ where: { id: idUser } });

    if (!table || !user) {
      throw new NotFoundException("Mesa ou usuário não encontrado!");
    }

    const existing = await this.userTableRepository.findOne({
      where: {
        user: { id: idUser },
        table: { id: idTable },
      },
    });

    if (existing) {
      return existing;
    }

    const newPlayer = this.userTableRepository.create({
      user,
      role: 'player',
      table,
    });

    await this.userTableRepository.save(newPlayer);
    return newPlayer;
  } catch (e) {
    throw new NotFoundException("Erro ao adicionar jogador à mesa.");
  }
}

}
