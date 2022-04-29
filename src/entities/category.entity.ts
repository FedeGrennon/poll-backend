import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class category
{
    @Prop()
    id?: Types.ObjectId;

    @Prop({ required: true })
    text: string;
}

export const CategorySchema = SchemaFactory.createForClass(category);

export type CategoryDocument = category & Document;