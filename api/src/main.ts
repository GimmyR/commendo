import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ 
    path: path.resolve(process.cwd(), ".env") 
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    const config = new DocumentBuilder()
       .setTitle("Commendo API")
       .setDescription("NestJS API documentation with Swagger UI")
       .setVersion("1.0")
       .addBearerAuth({
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'JWT',
           name: 'JWT',
           description: 'Paste your JWT token',
           in: 'header',
       },
       'access-token',)
       .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
