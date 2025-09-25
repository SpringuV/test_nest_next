import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // tránh truyền thừa thông tin
            forbidNonWhitelisted: true, // if set to true, instead of stripping non-whitelisted properties validator will throw an exception
            transform: true,
            transformOptions: {
                enableImplicitConversion: true, // quan trọng
            },
        }),
    );

    // config cors
    app.enableCors({
        origin: true, // cho phép frontend gọi
        credentials: true,                 // cho phép gửi cookie/token
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    })

    app.setGlobalPrefix('api/v1', { exclude: [''] });
    await app.listen(port);
}
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
