import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { pollResult, PollResultDocument } from "../entities";
import { BaseRepository } from "./base.repository";
import { Model } from 'mongoose';

@Injectable()
export class PollResultRepository extends BaseRepository<pollResult>
{
    constructor(@InjectModel(pollResult.name) result: Model<PollResultDocument>)
    {
        super(result);
    }
}