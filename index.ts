import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { HttpExceptionFilter } from "./src/filters";
import { AppModule } from "./src/modules";

declare const module: any;

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.listen(configService.get('port'));
    
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();