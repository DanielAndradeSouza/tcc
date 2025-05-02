import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({...createUserDto, creation_date: new Date()});
    return await this.userRepository.save(user);
  }


  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findById(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
  

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
  
    const updatedUser = { ...user, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }
  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
