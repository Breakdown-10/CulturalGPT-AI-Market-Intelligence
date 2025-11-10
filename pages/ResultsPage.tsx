import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AnalysisResult } from '../types';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/Loader';

type Tab = 'Brand DNA' | 'Cultural Insights' | 'Strategy' | 'Risk Assessment';

const ResultsPage: React.FC<{ analysisId: string }> = ({ analysisId }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Brand DNA');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setError(null);
      try {
        const storedData = localStorage.getItem(analysisId);
        if (storedData) {
          setResult(JSON.parse(storedData));
        } else {
          setError(`Analysis report with ID "${analysisId}" not found. It might have been cleared from your browser's storage. Please start a new analysis.`);
        }
      } catch (e) {
        console.error("Failed to load analysis report:", e);
        setError("An error occurred while loading the analysis report. The data might be corrupted.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [analysisId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
            <Loader message="Loading analysis report..." />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">Analysis Failed</CardTitle>
                        <CardDescription>An error occurred while fetching your report.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{error}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => window.location.reload()}>Try Again</Button>
                    </CardFooter>
                </Card>
            </div>
        </DashboardLayout>
    );
  }

  if (!result) {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-full">
                <p>Could not find the analysis report.</p>
            </div>
        </DashboardLayout>
    );
  }


  const renderContent = () => {
    switch (activeTab) {
      case 'Brand DNA':
        return (
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Brand Archetype: {result.brandDNA.archetype}</CardTitle></CardHeader>
                    <CardContent>{result.brandDNA.summary}</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Tone & Voice</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            {result.brandDNA.tone.map(t => <li key={t}>{t}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader><CardTitle>Core Audience Traits</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                        {result.brandDNA.audienceTraits.map(trait => <span key={trait} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{trait}</span>)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
      case 'Cultural Insights':
         return (
             <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Cultural Alignment Score</CardTitle>
                        <CardDescription>How well your brand's DNA matches values in {result.targetMarket}.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={result.culturalInsights.chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
                                <Legend />
                                <Bar dataKey="value" name="Alignment Score" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Overall Score</CardTitle></CardHeader>
                     <CardContent className="flex items-center justify-center">
                        <div className="text-7xl font-bold text-primary">{result.culturalInsights.alignmentScore}</div>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader><CardTitle>Opportunities</CardTitle></CardHeader>
                    <CardContent><ul className="list-disc pl-5 space-y-2 text-sm">{result.culturalInsights.opportunities.map((o,i)=><li key={i}>{o}</li>)}</ul></CardContent>
                 </Card>
                 <Card>
                    <CardHeader><CardTitle>Risks</CardTitle></CardHeader>
                    <CardContent><ul className="list-disc pl-5 space-y-2 text-sm">{result.culturalInsights.risks.map((r,i)=><li key={i}>{r}</li>)}</ul></CardContent>
                 </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader><CardTitle>Localization Advice</CardTitle></CardHeader>
                    <CardContent><p>{result.culturalInsights.localizationAdvice}</p></CardContent>
                 </Card>
             </div>
         );
      case 'Strategy':
         return (
             <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Executive Summary</CardTitle></CardHeader>
                    <CardContent><p>{result.strategy.executiveSummary}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Recommendations</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {result.strategy.recommendations.map((rec, i) => (
                            <div key={i}>
                                <h4 className="font-semibold">{rec.title}</h4>
                                <p className="text-muted-foreground text-sm">{rec.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Market Entry Roadmap</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        {result.strategy.roadmap.map((phase, i) => (
                            <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{phase.phase}</h4>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                                   {phase.activities.map((act, j) => <li key={j}>{act}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
             </div>
         );
      case 'Risk Assessment':
         return (
             <Card>
                <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Overall Risk Level: <span className="font-bold">{result.riskAssessment.level}</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="divide-y">
                    {result.riskAssessment.factors.map((item, i) => (
                        <div key={i} className="py-4 grid md:grid-cols-3 gap-4">
                            <div className="font-semibold md:col-span-1">{item.factor}</div>
                            <div className="text-muted-foreground md:col-span-2">{item.mitigation}</div>
                        </div>
                    ))}
                    </div>
                </CardContent>
             </Card>
         );
      default:
        return null;
    }
  };
  
  const TabButton: React.FC<{ tabName: Tab }> = ({ tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
    >
      {tabName}
    </button>
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold">Analysis for {result.brandName}</h1>
            <p className="text-muted-foreground">Target Market: {result.targetMarket}</p>
        </div>
        <Button onClick={() => alert('PDF download would start here.')}>Download Report</Button>
      </div>

      <div className="border-b mb-6">
          <nav className="flex space-x-2">
             {(['Brand DNA', 'Cultural Insights', 'Strategy', 'Risk Assessment'] as Tab[]).map(tab => <TabButton key={tab} tabName={tab} />)}
          </nav>
      </div>

      <div>{renderContent()}</div>
    </DashboardLayout>
  );
};

export default ResultsPage;