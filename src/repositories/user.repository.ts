import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { user, UserDocument } from "../entities";
import { BaseRepository } from "./base.repository";
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<user>
{
    constructor(@InjectModel(user.name) user: Model<UserDocument>)
    {
        super(user);
    }
}