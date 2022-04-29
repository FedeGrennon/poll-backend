import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { category } from './category.entity';
import { user } from './user.entity';

@Schema({ timestamps: true })
export class poll
{
    @Prop()
    id?: mongoose.Types.ObjectId;

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    choices: Array<{ id: string, text: string }>

    @Prop()
    tags?: Array<string>

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'category' })
    category: category;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user: user
}

export const PollSchema = SchemaFactory.createForClass(poll);

export type PollDocument = poll & Document;