import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class reportType
{
    @Prop()
    id?: Types.ObjectId;

    @Prop({ required: true })
    description: string;
}

export const ReportTypeSchema = SchemaFactory.createForClass(reportType);

export type ReportTypeDocument = reportType & Document;