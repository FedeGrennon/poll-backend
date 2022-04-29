import { Injectable, HttpException } from "@nestjs/common";
import { category } from "../entities";
import { CategoryRepository } from "../repositories";
import { Types } from 'mongoose';

@Injectable()
export class CategoryService
{
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    async getCategoryById(id: Types.ObjectId): Promise<category>
    {
        return await this.categoryRepository.findOne({ _id: id });
    }

    async getCategories(): Promise<Array<category>>
    {
        return await this.categoryRepository.findAll({});
    }

    async createCategory(newCategory: string): Promise<Array<category>>
    {
        if(!newCategory)
            throw new HttpException('category must be a string', 400);

        const categoryBD = await this.categoryRepository.findOne({ text: new RegExp(newCategory, 'i') });

        if(!categoryBD)
        {
            const category = await this.categoryRepository.create({ text: newCategory });
    
            if(!category)
                throw new Error('Error creating category');
        }
        
        return await this.categoryRepository.findAll();
    }
}