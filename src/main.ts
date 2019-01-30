import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = (await process.env.NOTIFICATOR_PORT) || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
    Logger.log(
        `Application running at http://localhost:${port}`,
        'ApplicationStartup',
    );
}
bootstrap();
