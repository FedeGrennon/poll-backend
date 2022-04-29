import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards";
import { CategoryService } from "../services";
import { category } from "../entities";

@Controller('category')
export class CategoryController
{
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCategory(@Body() body: { category: string }): Promise<Array<category>>
    {
        return await this.categoryService.createCategory(body.category);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCategory(): Promise<Array<category>>
    {
        return await this.categoryService.getCategories();
    }
}