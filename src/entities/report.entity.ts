import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { reportType } from './report-type.entity';
import { user } from './user.entity';

@Schema({ timestamps: true })
export class report
{
    @Prop()
    id?: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'report-type' })
    type: reportType;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user: user
}

export const ReportSchema = SchemaFactory.createForClass(report);

export type ReportDocument = report & Document;