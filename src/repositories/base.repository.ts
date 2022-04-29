import { Model, FilterQuery } from 'mongoose';

export class BaseRepository<T>
{
    constructor(private model: Model<any>) {}

    async findAll(query?: FilterQuery<any>): Promise<T[]>
    {
        return await this.model.find(query);
    }

    async findOne(query: FilterQuery<any>): Promise<T>
    {
        return await this.model.findOne(query);
    }

    async create(entity: T): Promise<T>
    {
        return await this.model.create(entity);
    }

    async updateOne(query: FilterQuery<any>, entity: T): Promise<T>
    {
        return await this.model.findOneAndUpdate(query, entity);
    }

    async removeOne(query: FilterQuery<any>): Promise<T>
    {
        return await this.model.findOneAndRemove(query);
    }
}