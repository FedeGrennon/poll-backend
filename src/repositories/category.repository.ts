import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { category, CategoryDocument } from "../entities";
import { BaseRepository } from "./base.repository";
import { Model } from 'mongoose';

@Injectable()
export class CategoryRepository extends BaseRepository<category>
{
    constructor(@InjectModel(category.name) category: Model<CategoryDocument>)
    {
        super(category);
    }
}