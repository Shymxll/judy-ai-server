import { runSimpleAgent } from "../service/agent01";
import { getUsefullCaseData } from "../service/caseService";
import { Request, Response } from "express";
import { systemPrompt } from "../utils/prompts";
import supabase from "../utils/supabaseClient";

export const analyze = async (req: Request, res: Response) => {
    try {
        const caseId = req.query.caseId as string;
        const caseData = await getUsefullCaseData();
        console.log(caseData);
        console.log("--------------------------------");    
        const analysis = await runSimpleAgent({ systemPrompt: systemPrompt, userPrompt: "Analyze the following case data: " + JSON.stringify(caseData) });

        const analysisJson = JSON.parse(analysis || "{}");
        console.log(analysisJson);

        // 1. Önce laws tablosuna yeni yasa ekle
        const { proposed_law_article, justification } = analysisJson;
        let law_id: string | undefined = undefined;
        if (proposed_law_article && proposed_law_article.title && proposed_law_article.text) {
            const { data: lawData, error: lawError } = await supabase
                .from('laws')
                .insert([
                    {
                        case_id: caseId,
                        title: proposed_law_article.title,
                        text: proposed_law_article.text,
                        created_by_ai: true
                    }
                ])
                .select('id')
                .single();
            if (lawError) {
                console.error('Supabase law insert error:', lawError);
                return res.status(500).json({ error: "Failed to save law" });
            }
            law_id = lawData.id;
        }

        // 2. justification içindeki participant_id ve skorları al, law_id ile birlikte ekle
        const results = Object.entries(justification || {}).map(([participant_id, ai_score]) => ({
            case_id: caseId,
            participant_id,
            ai_score,
            law_id
        }));
        if (results.length > 0) {
            const { error } = await supabase.from('case_results').insert(results);
            if (error) {
                console.error('Supabase insert error:', error);
                return res.status(500).json({ error: "Failed to save results" });
            }
        }


        // 3. case için statusu "completed" yap
        const { error: caseError } = await supabase
            .from('cases')
            .update({ status: 'completed' })
            .eq('id', caseId);
        if (caseError) {
            console.error('Supabase case update error:', caseError);
            return res.status(500).json({ error: "Failed to update case status" });
        }


        res.json({ analysisJson, law_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};

