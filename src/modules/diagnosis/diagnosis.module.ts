import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { OpenAIModule } from '../openai/openai.module';
import { DiagnosisController } from './diagnosis.controller';

@Module({
  controllers: [DiagnosisController],
  imports:[OpenAIModule],
  providers: [DiagnosisService],
  exports:[DiagnosisService]
})
export class DiagnosisModule {}
