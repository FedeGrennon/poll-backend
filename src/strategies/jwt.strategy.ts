import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from '../services';
import { JwtSignDto } from '../dto';
import { user } from '../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authService: AuthService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(validationPayload: JwtSignDto): Promise<user>
    {
        return await this.authService.verifyUser(validationPayload);
    }
}