import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.entity';
import { poll } from './poll.entity';
import { pollChoice } from './poll-choice.entity';

@Schema({ timestamps: true })
export class pollResult
{
    @Prop()
    id?: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'poll' })
    poll: poll;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user: user

    @Prop({ required: true })
    voted_choice: pollChoice
}

export const PollResultSchema = SchemaFactory.createForClass(pollResult);

export type PollResultDocument = pollResult & Document;