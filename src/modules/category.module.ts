import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "../controllers/category.controller";
import { category, CategorySchema } from "../entities";
import { CategoryRepository } from "../repositories";
import { CategoryService } from "../services";

@Module({
    controllers: [CategoryController],
    providers: [CategoryRepository, CategoryService],
    imports: [MongooseModule.forFeature([{ name: category.name, schema: CategorySchema }])],
    exports: [CategoryService]
})
export class CategoryModule {}