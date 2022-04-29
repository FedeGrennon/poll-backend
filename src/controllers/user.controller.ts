import { Body, Controller, Post } from "@nestjs/common";
import { SignUpDto } from "../dto";
import { UserService } from "../services";
import { user } from "../entities";
import { uuid } from 'uuidv4';
import moment = require("moment");

@Controller('user')
export class UserController
{
    constructor(private readonly userService: UserService) {}

    @Post()
    async signUp(@Body() body: SignUpDto): Promise<user>
    {
        return await this.userService.createUser(body.email, body.username, body.password);
    }

    @Post('fake')
    async fakeSignUp(): Promise<user>
    {
        const username = `fake_user_${moment().unix()}`;
        const email = `fake_email_${uuid()}`;

        return await this.userService.createUser(email, username);
    }
}