import { Injectable, HttpException } from "@nestjs/common";
import { PollResultRepository } from "../repositories";
import { PollService } from "./poll.service";
import { poll, pollResult, user } from "../entities";
import { Types } from 'mongoose';

@Injectable()
export class PollResultService
{
    constructor(
        private readonly pollResultRepository: PollResultRepository,
        private readonly pollService: PollService
    ) {}

    async vote(pollId: Types.ObjectId, votedChoiceId: string, user: user): Promise<pollResult>
    {
        const poll = await this.pollService.getPollById(pollId);

        if(!poll)
            throw new HttpException('Poll does not exist', 404);

        const votedChoice = poll.choices.find(x => x.id === votedChoiceId);

        if(!votedChoice)
            throw new HttpException('Choice does not exist in the poll selected', 404);

        return await this.pollResultRepository.create({
            poll,
            user,
            voted_choice: votedChoice
        });
    }

    async getResultsFromPoll(pollId: Types.ObjectId): Promise<object>
    {
        const poll = await this.pollService.getPollById(pollId);
        
        if(!poll)
            throw new HttpException('Poll does not exist', 404);
        
        const choicesCount = {
            pollId,
            total: 0
        };
        
        poll.choices.forEach(x => choicesCount[x.id] = 0);

        const pollResults = await this.pollResultRepository.findAll({ poll: pollId });
        
        if(pollResults)
            return pollResults.reduce((prev, curr) => {
                    prev.total++;
                    prev[curr.voted_choice.id]++;
                    return prev;
                }, choicesCount);

        return choicesCount;
    }
}