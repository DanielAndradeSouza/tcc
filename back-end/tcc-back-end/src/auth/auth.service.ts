import { ForbiddenException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Entidades/user/user.service';
import { UserTableService } from 'src/Entidades/user_table/user_table.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,private userTableService:UserTableService){}

    async signIn(email: string, pass: string) {
        const user = await this.userService.findOne(email);

        if (user?.active === false) {
            throw new ForbiddenException("Conta desativada!");
        }
        if (user?.password == null) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
            user_id: user.id,      
        };
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
