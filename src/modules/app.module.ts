import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "../config";
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { PollModule } from './poll.module';
import { CategoryModule } from './category.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `${configService.get('mongodb.host')}:${configService.get('mongodb.port')}`,
                dbName: configService.get('mongodb.database'),
                useNewUrlParser: true,
                useUnifiedTopology: true
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        UserModule,
        CategoryModule,
        PollModule,
    ]
})
export class AppModule {}

