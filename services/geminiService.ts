
import type { AnalysisResult } from '../types';

const mockAnalysisResult: AnalysisResult = {
  id: 'mock-id-12345',
  brandName: 'InnovateX',
  targetMarket: 'Japan',
  brandDNA: {
    archetype: 'The Creator',
    tone: ['Innovative', 'Bold', 'Minimalist'],
    audienceTraits: ['Tech-savvy', 'Early Adopters', 'Design-conscious'],
    summary: 'InnovateX positions itself as a forward-thinking technology brand that values design and cutting-edge solutions. Its core message revolves around empowering users to create and innovate.',
  },
  culturalInsights: {
    alignmentScore: 78,
    opportunities: [
      'High appreciation for minimalist design and quality craftsmanship in Japan aligns with InnovateX\'s brand aesthetic.',
      'The "Creator" archetype resonates with a growing subculture of digital artists and entrepreneurs.',
      'Emphasis on long-term value and reliability is a key purchasing driver.',
    ],
    risks: [
      'Bold, disruptive messaging may be perceived as arrogant if not balanced with respect for tradition and harmony ("Wa").',
      'Competition from established domestic tech giants is fierce.',
      'Subtle nuances in color symbolism and communication style must be carefully managed.',
    ],
    localizationAdvice: 'Adapt marketing materials to feature local creators and use a more indirect, relationship-focused communication style. Emphasize product quality and long-term support over aggressive claims.',
    chartData: [
      { name: 'Aesthetic', value: 90 },
      { name: 'Values', value: 75 },
      { name: 'Messaging', value: 60 },
      { name: 'Archetype', value: 85 },
    ],
  },
  strategy: {
    executiveSummary: 'Entering the Japanese market requires a nuanced approach that leverages InnovateX\'s design strengths while adapting its communication to local cultural norms. The strategy focuses on building trust and demonstrating long-term commitment through partnerships and community engagement.',
    recommendations: [
      { title: 'Partnership with Local Design Influencers', description: 'Collaborate with respected Japanese designers and tech reviewers to build credibility.' },
      { title: 'Community-Focused Launch Event', description: 'Host an exclusive event in Tokyo for creators and early adopters, focusing on experience over sales.' },
      { title: 'Refined Messaging Campaign', description: 'Develop a campaign with the theme of "Harmony in Innovation," blending modern tech with traditional values.' },
    ],
    roadmap: [
        { phase: 'Phase 1 (0-3 Months)', activities: ['Market research validation', 'Influencer identification', 'Initial messaging localization'] },
        { phase: 'Phase 2 (3-6 Months)', activities: ['Launch partner program', 'Execute launch event', 'Deploy targeted digital ad campaign'] },
        { phase: 'Phase 3 (6-12 Months)', activities: ['Establish local customer support', 'Expand retail presence', 'Measure brand sentiment and adjust strategy'] },
    ],
  },
  riskAssessment: {
    level: 'Medium',
    factors: [
        { factor: 'Cultural Misinterpretation', mitigation: 'Engage local cultural consultants and conduct extensive user testing of all marketing assets.' },
        { factor: 'Intense Competition', mitigation: 'Differentiate on user experience and design, rather than competing solely on features or price.' },
        { factor: 'Supply Chain Logistics', mitigation: 'Establish partnerships with reliable local distributors early in the process.' },
    ],
  },
};

// This function simulates the entire analysis pipeline.
export const generateFullAnalysis = async (
  brandName: string,
  targetMarket: string
): Promise<AnalysisResult> => {
  console.log(`Starting analysis for ${brandName} in ${targetMarket}...`);

  // Simulate network delay and processing time
  await new Promise(resolve => setTimeout(resolve, 4000));

  console.log('Analysis complete.');
  return {
    ...mockAnalysisResult,
    brandName,
    targetMarket,
  };
};
