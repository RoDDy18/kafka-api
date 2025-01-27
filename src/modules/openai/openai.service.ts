import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AnxietyDto, Condition, ConditionDto, Diagnosis, DiagnosisDto } from '../diagnosis/diagnosis.model';

@Injectable()
export class OpenAIService {
    private openai: OpenAI;
    constructor(){
        this.openai = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com",
            apiKey: process.env.GITHUB_TOKEN,
            //apiKey: process.env.OPEN_API_KEY,
        });
    }

    public async generate(diagnosis: DiagnosisDto): Promise<Diagnosis>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${diagnosis.onboarding.name}, a ${diagnosis.onboarding.age}-year-old ${diagnosis.onboarding.gender} who is currently ${diagnosis.onboarding.lifestyle_occupation}, describing their days as ${diagnosis.onboarding.daily_routine}. They enjoy ${diagnosis.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${diagnosis.onboarding.indoors_outdoors}, they live ${diagnosis.onboarding.living_situation} and feel ${diagnosis.onboarding.social_connection}. While they ${diagnosis.onboarding.therapy_experience} and their physical condition: ${diagnosis.onboarding.physical_health_condition}, they are seeking support with ${diagnosis.onboarding.mental_health_concerns}. They rate their current mental well-being as ${diagnosis.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${diagnosis.onboarding.goals}. They prefer ${diagnosis.onboarding.communication_style} and appreciate ${diagnosis.onboarding.interaction_preference} to stay motivated and supported.
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, Based on the questions, it's purpose, corresponding answers, and what you know about the user, psychology and philosophy, draft out a title of problem(strictly named title of problem), diagnosis(strictly named diagnosis, delve deep into this), potential cause(strcitly named potential cause, delve deep into this), recommendation(don't make it a list of items, strictly named recommendation, delve deep into this) and final thought(strictly named final thought, delve deep into this), like you're talking to the user, ${diagnosis.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Emotional State Assessment
                    Question: In the past two weeks, how often have you felt overwhelmed, sad, or anxious? Can you describe what might have triggered these feelings?
                    Purpose: Gauges the patient's emotional baseline and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.emotional_state_assessment}
                    
                    
                    Physical and Behavioral Changes
                    Question: Have you noticed any recent changes in your sleep patterns, appetite, or energy levels? If yes, could you describe them?
                    Purpose: Helps link physical changes to psychological conditions such as depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.physical_behavioral_changes}
                    
                    Coping Mechanisms
                    Question: When you feel stressed or upset, what do you usually do to cope? Do you find these methods helpful?
                    Purpose: Evaluates the patient’s coping strategies and their effectiveness.
                    Answer: ${diagnosis.wellbeing_questions.coping_mechanisms}
                    
                    Social Connections
                    Question: How would you describe your relationships with family, friends, or coworkers? Have you felt isolated or misunderstood lately?
                    Purpose: Identifies social support levels and potential feelings of isolation.
                    Answer: ${diagnosis.wellbeing_questions.social_connections}
                    
                    Self-Perception
                    Question: How do you feel about yourself these days? Do you find yourself being overly critical or having difficulty feeling confident?
                    Purpose: Explores self-esteem and self-image, which can indicate conditions like depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.self_perception}
                    
                    Stress and Triggers
                    Question: What situations or events tend to make you feel stressed or anxious? How do you usually react in those moments?
                    Purpose: Pinpoints specific triggers and the patient's reactions to stress.
                    Answer: ${diagnosis.wellbeing_questions.stress_and_triggers}
                    
                    Work/Life Balance
                    Question: How do you feel about your daily routine? Do you feel you have a good balance between work, personal life, and time for yourself?
                    Purpose: Assesses the patient’s lifestyle balance and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.work_life_balance}
                    
                    Intrusive Thoughts
                    Question: Do you often have thoughts that feel uncontrollable or distressing? If so, how do you usually deal with them?
                    Purpose: Detects signs of obsessive-compulsive tendencies or anxiety-related thoughts.
                    Answer: ${diagnosis.wellbeing_questions.intrusive_thoughts}
                    
                    Life Satisfaction
                    Question: Are there any areas of your life—such as career, relationships, or personal growth—that you feel unsatisfied with? What changes would you like to see?
                    Purpose: Identifies sources of dissatisfaction that may impact mental health.
                    Answer: ${diagnosis.wellbeing_questions.life_satisfaction}
                    
                    Therapy Goals
                    Question: If you could change one thing about how you feel or function, what would it be? What would success in therapy look like for you?
                    Purpose: Clarifies the patient’s goals for therapy and helps tailor the therapeutic approach.
                    Answer: ${diagnosis.wellbeing_questions.therapy_goals}
                    `
                },
            ],
        });

        const jsonResponse = this.convertMarkdownToJson(completion.choices[0].message.content);

        // console.log(completion.choices[0].message.content);
        // console.log("=======================");
        // console.log(jsonResponse);
        // console.log("=======================");

       return jsonResponse;
    }

    public async generateFormatted(diagnosis: DiagnosisDto): Promise<Diagnosis>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${diagnosis.onboarding.name}, a ${diagnosis.onboarding.age}-year-old ${diagnosis.onboarding.gender} who is currently ${diagnosis.onboarding.lifestyle_occupation}, describing their days as ${diagnosis.onboarding.daily_routine}. They enjoy ${diagnosis.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${diagnosis.onboarding.indoors_outdoors}, they live ${diagnosis.onboarding.living_situation} and feel ${diagnosis.onboarding.social_connection}. While they ${diagnosis.onboarding.therapy_experience} and their physical condition: ${diagnosis.onboarding.physical_health_condition}, they are seeking support with ${diagnosis.onboarding.mental_health_concerns}. They rate their current mental well-being as ${diagnosis.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${diagnosis.onboarding.goals}. They prefer ${diagnosis.onboarding.communication_style} and appreciate ${diagnosis.onboarding.interaction_preference} to stay motivated and supported.
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, Based on the questions, it's purpose, corresponding answers, and what you know about the user, psychology and philosophy, draft out a title of problem(strictly named title of problem), diagnosis(strictly named diagnosis, delve deep into this), potential cause(strcitly named potential cause, delve deep into this), recommendation(strictly named recommendation, delve deep into this) and final thought(strictly named final thought, delve deep into this) designed to output JSON, like you're talking to the user, ${diagnosis.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Emotional State Assessment
                    Question: In the past two weeks, how often have you felt overwhelmed, sad, or anxious? Can you describe what might have triggered these feelings?
                    Purpose: Gauges the patient's emotional baseline and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.emotional_state_assessment}
                    
                    
                    Physical and Behavioral Changes
                    Question: Have you noticed any recent changes in your sleep patterns, appetite, or energy levels? If yes, could you describe them?
                    Purpose: Helps link physical changes to psychological conditions such as depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.physical_behavioral_changes}
                    
                    Coping Mechanisms
                    Question: When you feel stressed or upset, what do you usually do to cope? Do you find these methods helpful?
                    Purpose: Evaluates the patient’s coping strategies and their effectiveness.
                    Answer: ${diagnosis.wellbeing_questions.coping_mechanisms}
                    
                    Social Connections
                    Question: How would you describe your relationships with family, friends, or coworkers? Have you felt isolated or misunderstood lately?
                    Purpose: Identifies social support levels and potential feelings of isolation.
                    Answer: ${diagnosis.wellbeing_questions.social_connections}
                    
                    Self-Perception
                    Question: How do you feel about yourself these days? Do you find yourself being overly critical or having difficulty feeling confident?
                    Purpose: Explores self-esteem and self-image, which can indicate conditions like depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.self_perception}
                    
                    Stress and Triggers
                    Question: What situations or events tend to make you feel stressed or anxious? How do you usually react in those moments?
                    Purpose: Pinpoints specific triggers and the patient's reactions to stress.
                    Answer: ${diagnosis.wellbeing_questions.stress_and_triggers}
                    
                    Work/Life Balance
                    Question: How do you feel about your daily routine? Do you feel you have a good balance between work, personal life, and time for yourself?
                    Purpose: Assesses the patient’s lifestyle balance and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.work_life_balance}
                    
                    Intrusive Thoughts
                    Question: Do you often have thoughts that feel uncontrollable or distressing? If so, how do you usually deal with them?
                    Purpose: Detects signs of obsessive-compulsive tendencies or anxiety-related thoughts.
                    Answer: ${diagnosis.wellbeing_questions.intrusive_thoughts}
                    
                    Life Satisfaction
                    Question: Are there any areas of your life—such as career, relationships, or personal growth—that you feel unsatisfied with? What changes would you like to see?
                    Purpose: Identifies sources of dissatisfaction that may impact mental health.
                    Answer: ${diagnosis.wellbeing_questions.life_satisfaction}
                    
                    Therapy Goals
                    Question: If you could change one thing about how you feel or function, what would it be? What would success in therapy look like for you?
                    Purpose: Clarifies the patient’s goals for therapy and helps tailor the therapeutic approach.
                    Answer: ${diagnosis.wellbeing_questions.therapy_goals}
                    `
                },
            ],
            response_format: { 
                type: "json_schema",
                json_schema: {
                    "name": "therapy_session",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "session_title": {
                          "type": "string",
                          "description": "The title of the medical session."
                        },
                        "diagnosis": {
                          "type": "string",
                          "description": "The diagnosis made during the session."
                        },
                        "potential_causes": {
                          "type": "string",
                          "description": "The potential causes related to the diagnosis."
                        },
                        "recommendations": {
                          "type": "array",
                          "description": "A list of recommendations based on the diagnosis.",
                          "items": {
                            "type": "string",
                            "description": "Each individual recommendation."
                          }
                        },
                        "final_thoughts": {
                          "type": "string",
                          "description": "Final thoughts or remarks from the session."
                        }
                      },
                      "required": [
                        "session_title",
                        "diagnosis",
                        "potential_causes",
                        "recommendations",
                        "final_thoughts"
                      ],
                      "additionalProperties": false
                    },
                    "strict": true
                }
            },
        });

        // console.log(JSON.parse(completion.choices[0].message.content));
        // console.log("=======================");

       return JSON.parse(completion.choices[0].message.content);
    }

    public async generateGit(diagnosis: DiagnosisDto): Promise<Diagnosis>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${diagnosis.onboarding.name}, a ${diagnosis.onboarding.age}-year-old ${diagnosis.onboarding.gender} who is currently ${diagnosis.onboarding.lifestyle_occupation}, describing their days as ${diagnosis.onboarding.daily_routine}. They enjoy ${diagnosis.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${diagnosis.onboarding.indoors_outdoors}, they live ${diagnosis.onboarding.living_situation} and feel ${diagnosis.onboarding.social_connection}. While they ${diagnosis.onboarding.therapy_experience} and their physical condition: ${diagnosis.onboarding.physical_health_condition}, they are seeking support with ${diagnosis.onboarding.mental_health_concerns}. They rate their current mental well-being as ${diagnosis.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${diagnosis.onboarding.goals}. They prefer ${diagnosis.onboarding.communication_style} and appreciate ${diagnosis.onboarding.interaction_preference} to stay motivated and supported.
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, in simple words, Based on the questions, it's purpose, corresponding answers, and what you know about the user, psychology and philosophy, draft out a title of problem(strictly named session_title), diagnosis(strictly named diagnosis, can quote philosophers here, delve deep into this), potential cause(strcitly named potential_causes, not a list of items, delve deep into this), recommendation(strictly named recommendations, array of string, delve deep into this) and final thought(strictly named final thought, delve deep into this) designed to output JSON, like you're talking to the user, ${diagnosis.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Emotional State Assessment
                    Question: In the past two weeks, how often have you felt overwhelmed, sad, or anxious? Can you describe what might have triggered these feelings?
                    Purpose: Gauges the patient's emotional baseline and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.emotional_state_assessment}
                    
                    
                    Physical and Behavioral Changes
                    Question: Have you noticed any recent changes in your sleep patterns, appetite, or energy levels? If yes, could you describe them?
                    Purpose: Helps link physical changes to psychological conditions such as depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.physical_behavioral_changes}
                    
                    Coping Mechanisms
                    Question: When you feel stressed or upset, what do you usually do to cope? Do you find these methods helpful?
                    Purpose: Evaluates the patient’s coping strategies and their effectiveness.
                    Answer: ${diagnosis.wellbeing_questions.coping_mechanisms}
                    
                    Social Connections
                    Question: How would you describe your relationships with family, friends, or coworkers? Have you felt isolated or misunderstood lately?
                    Purpose: Identifies social support levels and potential feelings of isolation.
                    Answer: ${diagnosis.wellbeing_questions.social_connections}
                    
                    Self-Perception
                    Question: How do you feel about yourself these days? Do you find yourself being overly critical or having difficulty feeling confident?
                    Purpose: Explores self-esteem and self-image, which can indicate conditions like depression or anxiety.
                    Answer: ${diagnosis.wellbeing_questions.self_perception}
                    
                    Stress and Triggers
                    Question: What situations or events tend to make you feel stressed or anxious? How do you usually react in those moments?
                    Purpose: Pinpoints specific triggers and the patient's reactions to stress.
                    Answer: ${diagnosis.wellbeing_questions.stress_and_triggers}
                    
                    Work/Life Balance
                    Question: How do you feel about your daily routine? Do you feel you have a good balance between work, personal life, and time for yourself?
                    Purpose: Assesses the patient’s lifestyle balance and potential stressors.
                    Answer: ${diagnosis.wellbeing_questions.work_life_balance}
                    
                    Intrusive Thoughts
                    Question: Do you often have thoughts that feel uncontrollable or distressing? If so, how do you usually deal with them?
                    Purpose: Detects signs of obsessive-compulsive tendencies or anxiety-related thoughts.
                    Answer: ${diagnosis.wellbeing_questions.intrusive_thoughts}
                    
                    Life Satisfaction
                    Question: Are there any areas of your life—such as career, relationships, or personal growth—that you feel unsatisfied with? What changes would you like to see?
                    Purpose: Identifies sources of dissatisfaction that may impact mental health.
                    Answer: ${diagnosis.wellbeing_questions.life_satisfaction}
                    
                    Therapy Goals
                    Question: If you could change one thing about how you feel or function, what would it be? What would success in therapy look like for you?
                    Purpose: Clarifies the patient’s goals for therapy and helps tailor the therapeutic approach.
                    Answer: ${diagnosis.wellbeing_questions.therapy_goals}
                    `
                },
            ],
            response_format: { 
                type: "json_object"
            },
        });

        // console.log(JSON.parse(completion.choices[0].message.content));
        // console.log("=======================");
        // console.log(jsonResponse);
        // console.log("=======================");

       return JSON.parse(completion.choices[0].message.content);
    }

    public async generateAnxietyReport(diagnosis:string, answers: ConditionDto): Promise<Condition>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${answers.onboarding.name}, a ${answers.onboarding.age}-year-old ${answers.onboarding.gender} who is currently ${answers.onboarding.lifestyle_occupation}, describing their days as ${answers.onboarding.daily_routine}. They enjoy ${answers.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${answers.onboarding.indoors_outdoors}, they live ${answers.onboarding.living_situation} and feel ${answers.onboarding.social_connection}. While they ${answers.onboarding.therapy_experience} and their physical condition: ${answers.onboarding.physical_health_condition}, they are seeking support with ${answers.onboarding.mental_health_concerns}. They rate their current mental well-being as ${answers.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${answers.onboarding.goals}. They prefer ${answers.onboarding.communication_style} and appreciate ${answers.onboarding.interaction_preference} to stay motivated and supported. ${answers.onboarding.name} was diagnosed with ${diagnosis}
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, in simple words, Based on the questions, it's options, the ${answers.onboarding.name}'s diagnosis, corresponding answers, what you know about the user, psychology and philosophy, draft out an advice(strictly named advice, short sweeet and simple, purely string) only designed to output JSON, like you're talking to the user, ${answers.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Feeling Nervous or Anxious
                    Question: Over the last two weeks, how often have you felt nervous, anxious, or on edge?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.general_anxiety}
                    
                    Uncontrollable Worrying
                    Question: How often have you found it hard to stop or control worrying over the past two weeks?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.control_over_worrying}
                    
                    Worrying About Many Things
                    Question: How frequently have you worried about many different things over the past two weeks?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.excessive_worrying}
                    
                    Difficulty Relaxing
                    Question: Over the past two weeks, how often have you had trouble relaxing?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.relaxation_difficulties}
                    
                    Restlessness
                    Question: How often have you felt so restless that it’s hard to sit still in the past two weeks?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.restlessness}
                    
                    Irritability
                    Question: In the last two weeks, how often have you felt easily annoyed or irritable?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.irritability}
                    
                    Sense of Dread
                    Question: How frequently have you felt as though something awful might happen in the past two weeks?
                    Scaling Options:
                    "This doesn’t apply to me at all."
                    "I’ve felt this way a few times."
                    "I’ve experienced this quite often."
                    "This has been happening almost every day."
                    Answers: ${answers.anxiety.sense_of_dread}
                    `
                },
            ],
            response_format: { 
                type: "json_object"
            },
        });

        //console.log(JSON.parse(completion.choices[0].message.content))
       return {
        report: diagnosis,
        ai_report: JSON.parse(completion.choices[0].message.content).advice
       }
    }

    public async generateDepressionReport(diagnosis:string, answers: ConditionDto): Promise<Condition>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${answers.onboarding.name}, a ${answers.onboarding.age}-year-old ${answers.onboarding.gender} who is currently ${answers.onboarding.lifestyle_occupation}, describing their days as ${answers.onboarding.daily_routine}. They enjoy ${answers.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${answers.onboarding.indoors_outdoors}, they live ${answers.onboarding.living_situation} and feel ${answers.onboarding.social_connection}. While they ${answers.onboarding.therapy_experience} and their physical condition: ${answers.onboarding.physical_health_condition}, they are seeking support with ${answers.onboarding.mental_health_concerns}. They rate their current mental well-being as ${answers.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${answers.onboarding.goals}. They prefer ${answers.onboarding.communication_style} and appreciate ${answers.onboarding.interaction_preference} to stay motivated and supported. ${answers.onboarding.name} was diagnosed with ${diagnosis}
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, in simple words, Based on the questions, it's options, the ${answers.onboarding.name}'s diagnosis, corresponding answers, what you know about the user, psychology and philosophy, draft out an advice(strictly named advice, short sweeet and simple, purely string) only designed to output JSON, like you're talking to the user, ${answers.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Little Interest or Pleasure in Activities
                    Question: In the past two weeks, how often have you found little interest or pleasure in doing things you usually enjoy?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.interest_and_pleasure}
                    
                    Feeling Down or Hopeless
                    Question: How often have you felt down, depressed, or hopeless in the last two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.mood_and_emotions}
                    
                    Trouble Sleeping
                    Question: Have you had trouble falling asleep, staying asleep, or sleeping too much over the past two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.sleep_patterns}
                    
                    Feeling Tired or Low Energy
                    Question: Do you often feel tired or lacking energy during the day? How frequently has this occurred in the last two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.energy_levels}
                    
                    Changes in Appetite
                    Question: Have you noticed any changes in your appetite, such as eating too much or too little, over the past two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.eating_habits}
                    
                    Feelings of Guilt or Worthlessness
                    Question: Have you felt bad about yourself, as if you are a failure or have let yourself or others down?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.self_worth}
                    
                    Trouble Concentrating
                    Question: Have you had difficulty concentrating on activities like reading or watching television in the past two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.concentration_issues}
                    
                    Restlessness or Slowness
                    Question: Have you noticed yourself feeling restless or moving more slowly than usual, such that others might comment on it?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.restlessness_or_slowness}
                    
                    Thoughts of Self-Harm
                    Question: Have you had thoughts of being better off dead or hurting yourself in the past two weeks?
                    Scaling Options:  
                    "This doesn’t apply to me at all." (0)  
                    "I’ve felt this way a few times." (1)  
                    "I’ve experienced this quite often." (2)  
                    "This has been happening almost every day." (3)  
                    Answers: ${answers.depression.thoughts_of_self_harm}
                    `
                },
            ],
            response_format: { 
                type: "json_object"
            },
        });

        //console.log(JSON.parse(completion.choices[0].message.content))
       return {
        report: diagnosis,
        ai_report: JSON.parse(completion.choices[0].message.content).advice
       }
    }

    public async generateAlcoholUseReport(diagnosis:string, answers: ConditionDto): Promise<Condition>{
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                {
                    "role": "system", 
                    "content": `The user named ${answers.onboarding.name}, a ${answers.onboarding.age}-year-old ${answers.onboarding.gender} who is currently ${answers.onboarding.lifestyle_occupation}, describing their days as ${answers.onboarding.daily_routine}. They enjoy ${answers.onboarding.interest_hobbies} in their free time but feel they rarely have time to engage in these activities. Preferring ${answers.onboarding.indoors_outdoors}, they live ${answers.onboarding.living_situation} and feel ${answers.onboarding.social_connection}. While they ${answers.onboarding.therapy_experience} and their physical condition: ${answers.onboarding.physical_health_condition}, they are seeking support with ${answers.onboarding.mental_health_concerns}. They rate their current mental well-being as ${answers.onboarding.overall_wellbeing_scale} out of 10 and hope to achieve ${answers.onboarding.goals}. They prefer ${answers.onboarding.communication_style} and appreciate ${answers.onboarding.interaction_preference} to stay motivated and supported. ${answers.onboarding.name} was diagnosed with ${diagnosis}
                    You are a therapist so use a calm, therapeutic, empathetic and humane voice, in simple words, Based on the questions, it's options, the ${answers.onboarding.name}'s diagnosis, corresponding answers, what you know about the user, psychology and philosophy, draft out an advice(strictly named advice, short sweeet and simple, purely string) only designed to output JSON, like you're talking to the user, ${answers.onboarding.name} directly`
                },
                {
                    "role": "user", 
                    "content": 
                    `Frequency of Alcohol Use
                    Question: How often do you have a drink containing alcohol?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.frequency_of_consumption}
                    
                    Drinks Per Occasion
                    Question: On a typical day when you drink, how many drinks do you usually have?
                    Scaling Options:  
                    "I usually have 0 to 2 drinks." (0)  
                    "I usually have 3 to 4 drinks." (1)  
                    "I usually have 5 to 6 drinks." (2)  
                    "I usually have 7 to 9 drinks." (3)  
                    "I usually have 10 or more drinks." (4)  
                    Answers: ${answers.alcohol_use.typical_drinking_quantity}
                    
                    Heavy Drinking Episodes
                    Question: How often do you have six or more drinks (if female) or eight or more drinks (if male) on one occasion?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.heavy_drinking_episodes}
                    
                    Difficulty Stopping Drinking
                    Question: How often during the last year have you found that you couldn’t stop drinking once you started?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.difficulty_stopping}
                    
                    Neglecting Responsibilities
                    Question: How often during the last year have you failed to do something you were supposed to because of drinking?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.responsibilities_and_drinking}
                    
                    Morning Drinking
                    Question: How often during the last year have you needed a drink in the morning to get yourself going after a heavy drinking session?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.morning_alcohol_use}
                    
                    Feelings of Guilt or Remorse
                    Question: How often during the last year have you felt guilty or remorseful after drinking?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.guilt_or_remorse}
                    
                    Memory Loss Due to Drinking
                    Question: How often during the last year have you been unable to remember what happened the night before because of drinking?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "This happens rarely, maybe once in a while." (1)  
                    "This happens a few times a month." (2)  
                    "This is a common experience for me every week." (3)  
                    "This is something I go through almost daily." (4)  
                    Answers: ${answers.alcohol_use.blackouts}
                    
                    Injury Related to Drinking
                    Question: Have you or someone else been injured because of your drinking?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "Yes, but it didn’t happen in the last year." (2)  
                    "Yes, and it happened in the last year." (4)  
                    Answers: ${answers.alcohol_use.injury_from_drinking}
                    
                    Concern from Others
                    Question: Has a relative, friend, or health professional expressed concern about your drinking or suggested that you cut down?
                    Scaling Options:  
                    "This has never been true for me." (0)  
                    "Yes, but it didn’t happen in the last year." (2)  
                    "Yes, and it happened in the last year." (4)
                    Answers: ${answers.alcohol_use.concern_from_others}
                    `
                },
            ],
            response_format: { 
                type: "json_object"
            },
        });

        //console.log(JSON.parse(completion.choices[0].message.content))
       return {
        report: diagnosis,
        ai_report: JSON.parse(completion.choices[0].message.content).advice
       }
    }

    private convertMarkdownToJson(markdown: string) {
        let result: Diagnosis = {
            session_title: "",
            diagnosis: "",
            potential_causes: "",
            recommendations: [],
            final_thoughts: ""
        };
      
        // Extract Title of Problem
        const titlePattern = /\*\*Title of Problem:\*\*\s*(.*)/;
        //const titlePattern = /\*\*Title of Problem:\*\*\s*(.*?)(?=\n|\*\*)/;
        const titleMatch = markdown.match(titlePattern);
        if (titleMatch) result['session_title'] = titleMatch[1];
      
        // Extract Diagnosis
        const diagnosisPattern = /\*\*Diagnosis:\*\*\s*(.*)/;
        const diagnosisMatch = markdown.match(diagnosisPattern);
        if (diagnosisMatch) result['diagnosis'] = diagnosisMatch[1];
      
        // Extract Potential Cause
        const causePattern = /\*\*Potential Cause:\*\*\s*(.*)/;
        const causeMatch = markdown.match(causePattern);
        if (causeMatch) result['potential_causes'] = causeMatch[1];
      
        // Extract Recommendations
        const recommendationPattern = /\*\*Recommendation:\*\*\s*(.*)/;
        const recommendations = [];
        const recommendationMatch = markdown.match(recommendationPattern);
        if (recommendationMatch) {
          let recommendationsText = recommendationMatch[1].split('. ').map(str => str.trim());
          recommendations.push(...recommendationsText);
        }
      
        result['recommendations'] = recommendations;
            
        // Extract Final Thought
        const finalThoughtPattern = /\*\*Final Thought:\*\*\s*(.*)/;
        const finalThoughtMatch = markdown.match(finalThoughtPattern);
        if (finalThoughtMatch) result['final_thoughts'] = finalThoughtMatch[1];
      
        return result;
    }
}
