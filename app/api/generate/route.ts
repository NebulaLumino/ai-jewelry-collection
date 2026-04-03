import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const prompt = buildPrompt(formData);
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function buildPrompt(formData: any): string {
  const fields = `- Metalpreference: ${formData['metalPreference'] || 'Not specified'}
- Gemstonepreference: ${formData['gemstonePreference'] || 'Not specified'}
- Existingcollection: ${formData['existingCollection'] || 'Not specified'}
- Occasions: ${formData['occasions'] || 'Not specified'}
- Budgetrange: ${formData['budgetRange'] || 'Not specified'}
- Personalstyle: ${formData['personalStyle'] || 'Not specified'}
- Metalallergies: ${formData['metalAllergies'] || 'Not specified'}
- Investmentvsfashion: ${formData['investmentVsFashion'] || 'Not specified'}`;
  const template = `You are an expert jewelry curator and gemologist. Based on the following profile, create a comprehensive jewelry collection curation report.

{fields}

Please provide:
1. Collection Gap Analysis (what is missing from their current collection)
2. Essential Pieces Recommendations (specific pieces they should acquire)
3. Styling Guide by Outfit Type (how to wear each piece)
4. Care Instructions (specific to their metals and gemstones)
5. Insurance Appraisal Checklist (for valuable pieces)
6. Investment-Grade Stone Notes (if applicable)
7. Occasion Stacking Guide (how to layer and combine pieces)

Format in clean markdown with organized sections and specific recommendations.`;
  return template.replace("{fields}", fields);
}
