import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CryptoHelper } from '../helpers';

@Schema({ timestamps: true })
export class user
{
    @Prop()
    id?: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    username: string;

    @Prop()
    password?: string;
}

const PreSchema = SchemaFactory.createForClass(user);
PreSchema.pre<user>('save', function(next: Function)
{
    if(this.password)
        this.password = CryptoHelper.Hash(this.password);
    next();
});

export const UserSchema = PreSchema;

export type UserDocument = user & Document;