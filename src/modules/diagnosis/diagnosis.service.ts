import { Injectable } from '@nestjs/common';
import { DiagnosisDto, ConditionDto, Condition } from './diagnosis.model';
import { OpenAIService } from '../openai/openai.service';
import { ConditionType } from './diagnosis.enum';
import { determineAlcoholUseLevel, determineAnxietyLevel, determineDepressionLevel } from 'src/common/common';

@Injectable()
export class DiagnosisService {
    constructor(private readonly openAI: OpenAIService){}

    public async ai(diagnosis: DiagnosisDto){
        try{
            const answer = await this.openAI.generateGit(diagnosis);
            return {
                "status": "success",
                "message": "Request successful",
                "generated_output": answer
            }
        }catch(e){
            return {
                "status": "error",
                "message": e.message
            }
        }
    }

    public async evidence(answers: ConditionDto){
        try{
            let answer = {}
            if(answers.condition_type == ConditionType.anxiety){
                answer = await this.anxietyEvaluation(answers);
            }else if(answers.condition_type == ConditionType.depression){
                answer = await this.depressionEvaluation(answers);
            }else if(answers.condition_type == ConditionType.alcohol_use){
                answer = await this.alcoholEvaluation(answers);
            }else{
                throw new Error("Invalid condition type");
            }
            return {
                "status": "success",
                "message": "Request successful",
                "generated_output": answer
            }
        }catch(e){
            return {
                "status": "error",
                "message": e.message
            }
        }
    }

    public async anxietyEvaluation(answers: ConditionDto): Promise<Condition>{
        const diagnosis = determineAnxietyLevel(answers.anxiety.condition_score);
        const final = await this.openAI.generateAnxietyReport(diagnosis, answers);
        return final;
    }

    public async depressionEvaluation(answers: ConditionDto): Promise<Condition>{
        const diagnosis = determineDepressionLevel(answers.depression.condition_score);
        const final = await this.openAI.generateDepressionReport(diagnosis, answers);
        return final;
    }

    public async alcoholEvaluation(answers: ConditionDto): Promise<Condition>{
        const diagnosis = determineAlcoholUseLevel(answers.alcohol_use.condition_score);
        const final = await this.openAI.generateAlcoholUseReport(diagnosis, answers);
        return final;
    }

}
