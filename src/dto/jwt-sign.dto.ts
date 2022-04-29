import { Types } from 'mongoose';
import { user } from '../entities';

export class JwtSignDto
{
    userId: Types.ObjectId;
    email: string;
    username: string;

    constructor(user: user)
    {
        this.userId = user.id;
        this.email = user.email;
        this.username = user.username;
    }
}