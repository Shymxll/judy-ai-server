import { CaseStatus } from '../enums/case';
import supabase from '../utils/supabaseClient';

export async function getWaitingForAnalysisCases() {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('status', 'waiting_for_analysis')
        .limit(1)
        .single();


    if (error) {
        throw error;
    }
    return data;
}

export async function getWaitingForProsecutorCases() {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('status', CaseStatus.WAITING_FOR_PROSECUTOR)
        .limit(1)
        .single();


    if (error) {
        throw error;
    }
    return data;
}

export async function getCaseById(caseId: string) {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', caseId)
        .single();

    if (error) {
        throw error;
    }
    return data;
}



export async function getUsefullCaseData() {
    const cases = await getWaitingForAnalysisCases();
    let caseDetails = [];
    let participant_1_questions_and_answers = [];
    let participant_2_questions_and_answers = [];

    if (cases) {
        const caseDetails = await getCaseDetails(cases.id);

        //first user 
        const participant_1 = caseDetails[0].participant_id;

        const participant_2 = caseDetails[1].participant_id;


        let participants_and_real_ids = []
        participants_and_real_ids.push({ participant_1: participant_1 });
        participants_and_real_ids.push({ participant_2: participant_2 });
        for (const detail of caseDetails) {
            participants_and_real_ids.push({ participant_id: detail.participant_id, real_id: detail.real_id });
        }



        console.log(participants_and_real_ids);

        //get questions and answers from case
        const questions = await getQuestions(cases.id, participant_1);

        for (const question of questions) {
            const answer = await getAnswer(question.id, participant_1);
            const question_and_answer = { question: question.question, answer: answer ? answer.answer : null };
            participant_1_questions_and_answers.push(question_and_answer);
        }

        //second user
        const questions_2 = await getQuestions(cases.id, participant_2);


        for (const question of questions_2) {
            const answer = await getAnswer(question.id, participant_2);
            const question_and_answer = { question: question.question, answer: answer ? answer.answer : null };
            participant_2_questions_and_answers.push(question_and_answer);
        }


        return { participants_and_real_ids, participant_1_questions_and_answers, participant_2_questions_and_answers, caseDetails };
    }
}

//get details from case
export async function getCaseDetails(caseId: string) {
    try {
        const { data, error } = await supabase
            .from('case_details')
            .select('*')
            .eq('case_id', caseId);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
}


// get questons and answers from case wit caseId
export async function getQuestions(caseId: string, participantId: string) {
    try {

        const { data, error } = await supabase
            .from('case_questions')
            .select('*')
            .eq('case_id', caseId)
            .eq('participant_id', participantId)

        if (error) {
            console.log("error");
            throw error;
        }
        return data;
    } catch (error) {
        console.log("error");
        throw error;
    }
}


// get answer from case_answers with question_id
export async function getAnswer(questionId: string, participantId: string) {
    const { data, error } = await supabase
        .from('case_answers')
        .select('*')
        .eq('question_id', questionId)
        .eq('participant_id', participantId)
        .maybeSingle();

    if (error) {
        throw error;
    }
    return data;
}


//get case_details with case_id
export async function getParticipantIdWithCaseId(caseId: string) {
    const { data, error } = await supabase
        .from('case_details')
        .select('participant_id')
        .eq('case_id', caseId)

    if (error) {
        throw error;
    }
    return data;
}




// get answer from case_answers with question_id