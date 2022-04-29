import { IsOptional, IsString, IsArray, IsMongoId, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

class PollChoice
{
    @IsString()
    text: string;
}

export class CreatePollDto
{
    @IsString()
    title: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(6)
    @Type(() => PollChoice)
    choices: Array<PollChoice>;

    @IsOptional()
    @IsArray()
    tags?: Array<string>;

    @IsMongoId()
    category_id: Types.ObjectId;
}