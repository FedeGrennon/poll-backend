import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JwtService } from '@nestjs/jwt';
import { user } from "../entities";
import { CryptoHelper } from '../helpers';
import { JwtSignDto } from "../dto";

@Injectable()
export class AuthService
{
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(user: user): Promise<String>
    {
        const payload = new JwtSignDto(user);
        return this.jwtService.sign({ ...payload });
    }

    async validateUser(email: string, password?: string): Promise<user>
    {
        const user = await this.userService.getUserByEmail(email);
        
        if (!user)
            return null;

        if(!user.password) //The user was created automatically, i do not log in
            return user; //Pass the auth 

        return CryptoHelper.Compare(password, user.password) ? user : null;
    }

    async verifyUser(validationPayload: JwtSignDto): Promise<user>
    {
        return this.userService.getUserByEmail(validationPayload.email);
    }
}