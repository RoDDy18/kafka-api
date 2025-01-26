import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import * as express from "express";
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS" });
  app.use(helmet());
  
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Kafka API Docs")
    .setDescription("Rest API documentation for kafka API.")
    .setVersion("1.0")
    .addTag("diagnosis")
    .build();
  
  const options2 = {
      customCss: '.swagger-ui .topbar { display: none }'
  };
  const docs = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, docs, options2);
  
  await app.listen(process.env.PORT).then(() => {
    console.log(`Listening for requests on port:${process.env.PORT}`);
  });
}
bootstrap();
