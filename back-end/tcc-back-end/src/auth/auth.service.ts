import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/Entidades/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async signIn(email:string, pass:string){
        const user = await this.userService.findOne(email);
        if(user?.password == null){
            throw new UnauthorizedException();
        }
        //Geração do WebToken JWT
        const payload = {sub: user.id, username: user.name};
        console.log(payload)
        return {access_token: await this.jwtService.signAsync(payload)};
    }
    async validateUser(email: string, pass: string){
        const user = await this.userService.findOne(email);
        if(user && user.password === pass){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
