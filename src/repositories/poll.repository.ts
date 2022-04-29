import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { poll, PollDocument } from "../entities";
import { BaseRepository } from "./base.repository";
import { Model } from 'mongoose';

@Injectable()
export class PollRepository extends BaseRepository<poll>
{
    constructor(@InjectModel(poll.name) private poll: Model<PollDocument>)
    {
        super(poll);
    }

    async getAllPolls(): Promise<Array<poll>>
    {
        return await this.poll.find()
            .populate('category')
            .populate('user');
    }
}