import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ConditionType } from "./diagnosis.enum";

export class OnBoarding{
    @ApiProperty({required:true, description:"User's name"})
    @IsNotEmpty()
    name: string;

    @ApiProperty({required:true, description:"User's age"})
    @IsNotEmpty()
    age: string;

    @ApiProperty({required:true, description:"User's gender"})
    @IsNotEmpty()
    gender: string;

    @ApiProperty({required:true, description:"User's lifestyle or occupation"})
    @IsNotEmpty()
    lifestyle_occupation: string;

    @ApiProperty({required:true, description:"User's daily routine"})
    @IsNotEmpty()
    daily_routine: string;

    @ApiProperty({required:true, description:"User's interest and hobbies"})
    @IsNotEmpty()
    interest_hobbies: string;

    @ApiProperty({required:true, description:"Indoor or outdorr person"})
    @IsNotEmpty()
    indoors_outdoors: string;

    @ApiProperty({required:true, description:"User's living situation"})
    @IsNotEmpty()
    living_situation: string;

    @ApiProperty({required:true, description:"User's social life"})
    @IsNotEmpty()
    social_connection: string;

    @ApiProperty({required:true, description:"User's experience with therapy"})
    @IsNotEmpty()
    therapy_experience: string;

    @ApiProperty({required:true, description:"User's mental health concerns, area of focus"})
    @IsNotEmpty()
    mental_health_concerns: string;

    @ApiProperty({required:true, description:"User's physical health conditions or ongoing treatments"})
    @IsNotEmpty()
    physical_health_condition: string;

    @ApiProperty({required:true, description:"User's overall mental well-being"})
    @IsNotEmpty()
    overall_wellbeing_scale: string;

    @ApiProperty({required:true, description:"AI communication style"})
    @IsNotEmpty()
    communication_style: string;

    @ApiProperty({required:true, description:"User's interation preference with AI"})
    @IsNotEmpty()
    interaction_preference: string;

    @ApiProperty({required:true, description:"User's goals"})
    @IsNotEmpty()
    goals: string;

}

export class WellbeingQuestions{
    @ApiProperty({required:true, description:"Gauges the patient's emotional baseline and potential stressors"})
    @IsNotEmpty()
    emotional_state_assessment: string;

    @ApiProperty({required:true, description:"Helps link physical changes to psychological conditions such as depression or anxiety"})
    @IsNotEmpty()
    physical_behavioral_changes: string;

    @ApiProperty({required:true, description:"Evaluates the patient’s coping strategies and their effectiveness"})
    @IsNotEmpty()
    coping_mechanisms: string;

    @ApiProperty({required:true, description:"Identifies social support levels and potential feelings of isolation"})
    @IsNotEmpty()
    social_connections: string;

    @ApiProperty({required:true, description:"Explores self-esteem and self-image, which can indicate conditions like depression or anxiety"})
    @IsNotEmpty()
    self_perception: string;

    @ApiProperty({required:true, description:"Pinpoints specific triggers and the patient's reactions to stress"})
    @IsNotEmpty()
    stress_and_triggers: string;

    @ApiProperty({required:true, description:"Assesses the patient’s lifestyle balance and potential stressors"})
    @IsNotEmpty()
    work_life_balance: string;

    @ApiProperty({required:true, description:"Detects signs of obsessive-compulsive tendencies or anxiety-related thoughts"})
    @IsNotEmpty()
    intrusive_thoughts: string;

    @ApiProperty({required:true, description:"Identifies sources of dissatisfaction that may impact mental health"})
    @IsNotEmpty()
    life_satisfaction: string;

    @ApiProperty({required:true, description:"Clarifies the patient’s goals for therapy and helps tailor the therapeutic approach"})
    @IsNotEmpty()
    therapy_goals: string;

}

export class DiagnosisDto{
    @ApiProperty({required:true, description:"Onboarding Information"})
    @IsNotEmpty()
    onboarding: OnBoarding;

    @ApiProperty({required:true, description:"Wellbeing Questions"})
    @IsNotEmpty()
    wellbeing_questions: WellbeingQuestions;
}

export class Diagnosis{
    @ApiProperty({required:true, description:"Session title"})
    session_title: string;

    @ApiProperty({required:true, description:"Diagnosis"})
    diagnosis: string;

    @ApiProperty({required:true, description:"Potential causes"})
    potential_causes: string;

    @ApiProperty({required:true, description:"Recommendations"})
    recommendations: string[];

    @ApiProperty({required:true, description:"Final summary and message for users"})
    final_thoughts: string;
}

export class Condition{
    @ApiProperty({required:true, description:"Condition Report"})
    report: string;

    @ApiProperty({required:true, description:"AI Generated Report"})
    ai_report: string;
}

export class AnxietyDto{
    @ApiProperty({required:true, description:"Condition Total Score"})
    @IsNotEmpty()
    condition_score: number;

    @ApiProperty({required:true, description:"Feeling nervous, anxious, or on edge"})
    @IsNotEmpty()
    general_anxiety: string;

    @ApiProperty({required:true, description:"Not being able to stop or control worrying"})
    @IsNotEmpty()
    control_over_worrying: string;

    @ApiProperty({required:true, description:"Worrying too much about different things"})
    @IsNotEmpty()
    excessive_worrying: string;

    @ApiProperty({required:true, description:"Trouble relaxing"})
    @IsNotEmpty()
    relaxation_difficulties: string;

    @ApiProperty({required:true, description:"Being so restless that it’s hard to sit still"})
    @IsNotEmpty()
    restlessness: string;

    @ApiProperty({required:true, description:"Becoming easily annoyed or irritable"})
    @IsNotEmpty()
    irritability: string;

    @ApiProperty({required:true, description:"Feeling afraid as if something awful might happen"})
    @IsNotEmpty()
    sense_of_dread: string;
}

export class DepressionDto{
    @ApiProperty({required:true, description:"Condition Total Score"})
    @IsNotEmpty()
    condition_score: number;

    @ApiProperty({required:true, description:"Little interest or pleasure in doing things"})
    @IsNotEmpty()
    interest_and_pleasure: string;

    @ApiProperty({required:true, description:"Feeling down, depressed, or hopeless"})
    @IsNotEmpty()
    mood_and_emotions: string;

    @ApiProperty({required:true, description:"Trouble falling or staying asleep, or sleeping too much"})
    @IsNotEmpty()
    sleep_patterns: string;

    @ApiProperty({required:true, description:"Feeling tired or having little energy"})
    @IsNotEmpty()
    energy_levels: string;

    @ApiProperty({required:true, description:"Poor appetite or overeating"})
    @IsNotEmpty()
    eating_habits: string;

    @ApiProperty({required:true, description:"Feeling bad about yourself or that you are a failure or have let yourself or your family down"})
    @IsNotEmpty()
    self_worth: string;

    @ApiProperty({required:true, description:"Trouble concentrating on things, such as reading the newspaper or watching television"})
    @IsNotEmpty()
    concentration_issues: string;

    @ApiProperty({required:true, description:"Moving or speaking so slowly that other people could have noticed. Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual"})
    @IsNotEmpty()
    restlessness_or_slowness: string;

    @ApiProperty({required:true, description:"Thoughts that you would be better off dead, or of hurting yourself in some way"})
    @IsNotEmpty()
    thoughts_of_self_harm: string;
}

export class AlcoholUseDto{
    @ApiProperty({required:true, description:"Condition Total Score"})
    @IsNotEmpty()
    condition_score: number;

    @ApiProperty({required:true, description:"Frequency of alcohol use"})
    @IsNotEmpty()
    frequency_of_consumption: string;

    @ApiProperty({required:true, description:"Amount of alcohol consumed per day"})
    @IsNotEmpty()
    typical_drinking_quantity: string;

    @ApiProperty({required:true, description:"Frequency of more units of alcohol than usual"})
    @IsNotEmpty()
    heavy_drinking_episodes: string;

    @ApiProperty({required:true, description:"Difficulty stopping alcohol"})
    @IsNotEmpty()
    difficulty_stopping: string;

    @ApiProperty({required:true, description:"Hard to meet up with responsibilities and obligations"})
    @IsNotEmpty()
    responsibilities_and_drinking: string;

    @ApiProperty({required:true, description:"The need to drink alcohol in the morning"})
    @IsNotEmpty()
    morning_alcohol_use: string;

    @ApiProperty({required:true, description:"Feeling guilty or remorseful about drinking alcohol"})
    @IsNotEmpty()
    guilt_or_remorse: string;

    @ApiProperty({required:true, description:"Memory loss from alcohol use"})
    @IsNotEmpty()
    blackouts: string;

    @ApiProperty({required:true, description:"Injury from alcohol use"})
    @IsNotEmpty()
    injury_from_drinking: string;

    @ApiProperty({required:true, description:"Concerns about alcohol use from others"})
    @IsNotEmpty()
    concern_from_others: string;
}

export class ConditionDto{
    @ApiProperty({required:true, description:"Condition Type", enum: ConditionType})
    @IsNotEmpty()
    condition_type: ConditionType;

    @ApiProperty({required:true, description:"Onboarding Information"})
    @IsNotEmpty()
    onboarding: OnBoarding;

    @ApiProperty({required:false, description:"Condition - Anxiety"})
    @IsOptional()
    anxiety?: AnxietyDto;

    @ApiProperty({required:false, description:"Condition - Depression"})
    @IsOptional()
    depression?: DepressionDto;

    @ApiProperty({required:false, description:"Condition - Alchohol Use"})
    @IsOptional()
    alcohol_use?: AlcoholUseDto;
}
