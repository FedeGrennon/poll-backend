import { IsMongoId, IsUUID } from 'class-validator';
import { Types } from 'mongoose';

export class VotePollDto
{
    @IsMongoId()
    pollId: Types.ObjectId;

    @IsUUID()
    votedChoiceId: string;
}