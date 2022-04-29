import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../controllers";
import { AuthService } from "../services";
import { JwtStrategy, LocalStrategy } from "../strategies";
import { UserModule } from "./user.module";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt_secret'),
                //signOptions: { expiresIn: `${configService.get('jwt_expire_seconds')}s` } //Token not expire
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}