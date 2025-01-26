import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Condition, ConditionDto, Diagnosis, DiagnosisDto } from './diagnosis.model';
import { DiagnosisService } from './diagnosis.service';

@ApiTags('diagnosis')
@Controller('api/v1/diagnosis')
export class DiagnosisController {
    constructor(private readonly diagnosisService:DiagnosisService){}

    @Get("/ai")
    @ApiResponse({
        description: 'Diagnosis response data',
        type: Diagnosis,
    })
    async ai(@Body() diagnosis:DiagnosisDto):Promise<any>{
        return this.diagnosisService.ai(diagnosis);
    }

    @Post("/ai")
    @ApiResponse({
        description: 'Diagnosis response data',
        type: Diagnosis,
    })
    async aiPost(@Body() diagnosis:DiagnosisDto):Promise<any>{
        return this.diagnosisService.ai(diagnosis);
    }

    @Get("/evidence-based")
    @ApiResponse({
        description: 'Evidence based report on conditions',
        type: Condition,
    })
    async evidence(@Body() answers:ConditionDto):Promise<any>{
        return this.diagnosisService.evidence(answers);
    }

    @Post("/evidence-based")
    @ApiResponse({
        description: 'Evidence based report on conditions',
        type: Condition,
    })
    async evidencePost(@Body() answers:ConditionDto):Promise<any>{
        return this.diagnosisService.evidence(answers);
    }

}
