
export interface BrandAnalysis {
  id: string;
  brandName: string;
  targetMarket: string;
  status: 'Completed' | 'In Progress' | 'Failed';
  createdAt: string;
}

export interface AnalysisResult {
  id: string;
  brandName: string;
  targetMarket: string;
  brandDNA: {
    archetype: string;
    tone: string[];
    audienceTraits: string[];
    summary: string;
  };
  culturalInsights: {
    alignmentScore: number;
    opportunities: string[];
    risks: string[];
    localizationAdvice: string;
    chartData: { name: string; value: number }[];
  };
  strategy: {
    executiveSummary: string;
    recommendations: { title: string; description: string }[];
    roadmap: { phase: string; activities: string[] }[];
  };
  riskAssessment: {
    level: 'Low' | 'Medium' | 'High';
    factors: { factor: string; mitigation: string }[];
  };
}
