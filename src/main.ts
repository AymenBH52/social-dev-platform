/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API social-dev') // Titre de votre API
    .setDescription("Documentation de l'API social-dev") // Description
    .setVersion('1.0') // Version de l'API
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // app.useGlobalGuards(new JwtGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
