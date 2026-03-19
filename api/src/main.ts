import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://localhost:4200')) {
        callback(null, true);
      } else {
        callback(new Error('Eu sei... Eu odeio CORS também...'));
      }
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
