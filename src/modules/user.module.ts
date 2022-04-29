import { Module } from "@nestjs/common";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, user } from "../entities";
import { UserService } from "../services";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService],
    imports: [MongooseModule.forFeature([{ name: user.name, schema: UserSchema }])],
    exports: [UserService]
})
export class UserModule {}