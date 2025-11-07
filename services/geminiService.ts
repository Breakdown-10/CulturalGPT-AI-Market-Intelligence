import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface BrandData {
  brandName: string;
  description: string;
  marketGoals: string;
  targetMarket: string;
  assets: { inlineData: { data: string; mimeType: string; } }[];
}

const analysisResultSchema = {
  type: Type.OBJECT,
  properties: {
    brandDNA: {
      type: Type.OBJECT,
      properties: {
        archetype: { type: Type.STRING },
        tone: { type: Type.ARRAY, items: { type: Type.STRING } },
        audienceTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
        summary: { type: Type.STRING },
      },
      required: ['archetype', 'tone', 'audienceTraits', 'summary']
    },
    culturalInsights: {
      type: Type.OBJECT,
      properties: {
        alignmentScore: { type: Type.NUMBER },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        risks: { type: Type.ARRAY, items: { type: Type.STRING } },
        localizationAdvice: { type: Type.STRING },
        chartData: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              value: { type: Type.NUMBER },
            },
            required: ['name', 'value']
          }
        },
      },
       required: ['alignmentScore', 'opportunities', 'risks', 'localizationAdvice', 'chartData']
    },
    strategy: {
      type: Type.OBJECT,
      properties: {
        executiveSummary: { type: Type.STRING },
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ['title', 'description']
          }
        },
        roadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING },
              activities: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['phase', 'activities']
          }
        },
      },
      required: ['executiveSummary', 'recommendations', 'roadmap']
    },
    riskAssessment: {
      type: Type.OBJECT,
      properties: {
        level: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
        factors: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              factor: { type: Type.STRING },
              mitigation: { type: Type.STRING },
            },
            required: ['factor', 'mitigation']
          }
        },
      },
      required: ['level', 'factors']
    },
  },
   required: ['brandDNA', 'culturalInsights', 'strategy', 'riskAssessment']
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateWithRetry = async (
  payload: any,
  maxRetries = 3,
  initialDelay = 2000
): Promise<GenerateContentResponse> => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const result = await ai.models.generateContent(payload);
      return result;
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        console.error("API call failed after multiple retries.", error);
        throw error;
      }

      const isOverloaded = error instanceof Error &&
        (error.message.includes('overloaded') || error.message.includes('503'));

      if (isOverloaded) {
        const delay = initialDelay * (2 ** (attempt - 1));
        console.log(`Model overloaded. Retrying in ${delay / 1000}s... (Attempt ${attempt}/${maxRetries})`);
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
  throw new Error("Exhausted all retries.");
};


export const generateFullAnalysis = async (brandData: BrandData): Promise<AnalysisResult> => {
  console.log(`Starting real analysis for ${brandData.brandName} in ${brandData.targetMarket}...`);

  const { brandName, description, marketGoals, targetMarket, assets } = brandData;

  const prompt = `
    You are CulturalGPT, an expert AI in global marketing, branding, and cultural analysis. Your task is to provide a comprehensive cultural market intelligence report.

    **Brand Information:**
    - Name: ${brandName}
    - Description: ${description}
    - Market Goals: ${marketGoals}

    **Target Market:**
    - ${targetMarket}

    **Brand Assets:**
    - Visual assets (logos, product shots, etc.) are provided as images.

    **Your Task:**
    Based on all the provided information, generate a detailed analysis structured as a JSON object. The analysis should cover:
    1.  **Brand DNA:** Define the brand's core identity, including a fitting archetype (e.g., The Creator, The Hero), its tone of voice, and key audience traits.
    2.  **Cultural Insights:** Analyze the brand's cultural alignment with the target market. Provide an overall alignment score from 0-100. Identify specific opportunities and risks. Give actionable localization advice. The chartData should represent alignment scores (0-100) for four key areas: 'Aesthetic', 'Values', 'Messaging', and 'Archetype'.
    3.  **Market-Entry Strategy:** Propose a high-level strategy with an executive summary, actionable recommendations, and a 3-phase roadmap (e.g., 0-3 months, 3-6 months, 6-12 months).
    4.  **Risk Assessment:** Identify potential risks and suggest clear mitigation strategies.

    Please adhere strictly to the provided JSON schema for your response. Ensure the entire output is a single, valid JSON object.
  `;

  const contents = [
    ...assets,
    { text: prompt },
  ];

  const response = await generateWithRetry({
    model: 'gemini-2.5-flash',
    contents: { parts: contents },
    config: {
      responseMimeType: 'application/json',
      responseSchema: analysisResultSchema,
    },
  });

  const analysisData = JSON.parse(response.text);

  return {
    id: `analysis-${Date.now()}`,
    brandName,
    targetMarket,
    ...analysisData,
  };
};