import { Injectable, HttpException } from "@nestjs/common";
import { Types } from "mongoose";
import { uuid } from "uuidv4";
import { CreatePollDto } from "../dto";
import { poll, user } from "../entities";
import { PollRepository } from "../repositories";
import { CategoryService } from "./category.service";

@Injectable()
export class PollService
{
    constructor(
        private readonly pollRepository: PollRepository,
        private readonly categoryService: CategoryService
    ) {}

    async createPoll(user: user, poll: CreatePollDto): Promise<poll>
    {
        const category = await this.categoryService.getCategoryById(poll.category_id);
        if(!category)
            throw new HttpException('Category does not exists', 404);

        return await this.pollRepository.create({
            title: poll.title,
            choices: poll.choices.map(x => ({ id: uuid(), text: x.text})),
            tags: poll.tags,
            category,
            user
        });
    }

    async getPolls(): Promise<Array<poll>>
    {
        return await this.pollRepository.getAllPolls();
    }

    async getPollById(pollId: Types.ObjectId): Promise<poll>
    {
        return await this.pollRepository.findOne({ _id: pollId });
    }
}