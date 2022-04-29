import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories";
import { user } from "../entities";

@Injectable()
export class UserService
{
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(email: string, username: string, password?: string): Promise<user>
    {
        return await this.userRepository.create({
            email,
            username,
            password
        });
    }

    async getUserByEmail(email: string): Promise<user>
    {
        return await this.userRepository.findOne({ email });
    }
}