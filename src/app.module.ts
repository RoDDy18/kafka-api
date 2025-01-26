import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { OpenAIModule } from './modules/openai/openai.module';
import { DiagnosisModule } from './modules/diagnosis/diagnosis.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    OpenAIModule,
    DiagnosisModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
