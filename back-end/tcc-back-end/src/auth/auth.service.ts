import { ForbiddenException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Entidades/user/user.service';
import { UserTable } from 'src/Entidades/user_table/entities/user_table.entity';
import { UserTableService } from 'src/Entidades/user_table/user_table.service';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,private userTableService:UserTableService){}

    async signIn(email:string, pass:string){
        const user = await this.userService.findOne(email);
        if(user?.active == false){
            throw new ForbiddenException("Cona desativada!");
        }
        if(user?.password == null){
            throw new UnauthorizedException();
        }
        //Geração do WebToken JWT
        const payload = {sub: user.id, username: user.name};
        console.log(payload)
        return {access_token: await this.jwtService.signAsync(payload)};
    }
    async getProfile(userId:number, tableId:number){
        try{
            const userTable = await this.userTableService.findOne(userId,tableId);
            const userRole = userTable?.role;
            return userRole;
        }catch(e){
            throw new NotFoundException("Usuário não vinculado a Mesa");
        }
    }
}
