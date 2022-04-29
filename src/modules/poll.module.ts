import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PollController } from "../controllers";
import { PollSchema, poll, pollResult, PollResultSchema } from "../entities";
import { PollRepository, PollResultRepository } from "../repositories";
import { PollService, PollResultService } from "../services";
import { CategoryModule } from "./category.module";

@Module({
    controllers: [PollController],
    providers: [PollRepository, PollResultRepository, PollService, PollResultService],
    imports: [
        CategoryModule,
        MongooseModule.forFeature([{ name: poll.name, schema: PollSchema }]),
        MongooseModule.forFeature([{ name: pollResult.name, schema: PollResultSchema }])
    ],
    exports: [PollService, PollResultService]
})
export class PollModule {}