import { Req, Controller, Post, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { user } from "../entities";
import { AuthService } from "../services";
import { LocalAuthGuard } from "../guards";

@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async signIn(@Req() req: Request): Promise<String>
    {
        return await this.authService.signIn(req.user as user);
    }
}