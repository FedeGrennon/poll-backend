import { Body, Controller, Post, Get, UseGuards, Req, Param, Type } from "@nestjs/common";
import { Request } from "express";
import { CreatePollDto, VotePollDto } from "../dto";
import { JwtAuthGuard } from "../guards";
import { PollService, PollResultService } from "../services";
import { poll, pollResult, user } from "../entities";
import { Types } from "mongoose";

@Controller('poll')
export class PollController
{
    constructor(
        private readonly pollService: PollService,
        private readonly pollResultService: PollResultService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPoll(@Body() body: CreatePollDto, @Req() req: Request): Promise<poll>
    {
        const user = req.user as user;
        return await this.pollService.createPoll(user, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPolls(): Promise<Array<poll>>
    {
        return await this.pollService.getPolls();
    }

    @UseGuards(JwtAuthGuard)
    @Post('vote')
    async voteInPoll(@Body() body: VotePollDto, @Req() req: Request): Promise<pollResult>
    {
        const user = req.user as user;
        return await this.pollResultService.vote(body.pollId, body.votedChoiceId, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('result/:pollId')
    async pollResult(@Param('pollId') pollId: Types.ObjectId): Promise<object>
    {
        return await this.pollResultService.getResultsFromPoll(pollId);
    }
}