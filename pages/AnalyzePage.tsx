
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { generateFullAnalysis } from '../services/geminiService';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { AnalysisResult } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Progress from '../components/ui/Progress';
import Loader from '../components/Loader';
import { TARGET_MARKETS, Logo } from '../constants';

const AnalyzePage: React.FC = () => {
  const { navigate, user } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [marketGoals, setMarketGoals] = useState('');
  const [assets, setAssets] = useState<File[]>([]);
  const [targetMarket, setTargetMarket] = useState(TARGET_MARKETS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step + 1);
    }
  };
  
  const fileToPart = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
    return {
        inlineData: {
            data: base64,
            mimeType: file.type,
        },
    };
  };

  const handleSubmit = async () => {
    if (!user) {
        alert("You must be logged in to save an analysis.");
        navigate('login');
        return;
    }

    setIsLoading(true);
    try {
      const assetParts = await Promise.all(
          assets
              .filter(file => file.type.startsWith('image/'))
              .map(fileToPart)
      );

      const result: Omit<AnalysisResult, 'id'> = await generateFullAnalysis({
        brandName: companyName,
        description,
        marketGoals,
        targetMarket,
        assets: assetParts,
      });
      
      const analysesCollectionRef = collection(db, 'users', user.uid, 'analyses');
      
      const newAnalysisDoc = await addDoc(analysesCollectionRef, {
          brandName: result.brandName,
          targetMarket: result.targetMarket,
          status: 'Completed',
          createdAt: serverTimestamp(),
          userId: user.uid,
          brandDNA: result.brandDNA,
          culturalInsights: result.culturalInsights,
          strategy: result.strategy,
          riskAssessment: result.riskAssessment,
      });

      navigate('results', newAnalysisDoc.id);

    } catch (error) {
        console.error("Analysis failed:", error);
        const errorMessage = error instanceof Error && (error.message.includes('overloaded') || error.message.includes('503'))
            ? "The model is currently overloaded. We tried a few times but were unsuccessful. Please try again later."
            : "An unexpected error occurred during the analysis. Please check the console for details and try again.";
        alert(errorMessage);
        setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
             <div className="flex items-center space-x-2 mb-8">
                <Logo className="h-10 w-10 text-foreground" />
                <span className="font-bold text-2xl">CulturalGPT</span>
            </div>
            <Loader message="Analyzing cultural resonance... this may take a moment." />
        </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-1">Brand Identity</h2>
            <p className="text-muted-foreground mb-6">Tell us about your company.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g., InnovateX" />
              </div>
              <div>
                <label className="text-sm font-medium">Brand Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Describe your brand's mission, values, and tone."></textarea>
              </div>
               <div>
                <label className="text-sm font-medium">Market Goals</label>
                <Input value={marketGoals} onChange={e => setMarketGoals(e.target.value)} placeholder="e.g., Become a top 3 choice for millennials" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-1">Brand Assets</h2>
            <p className="text-muted-foreground mb-6">Upload logos, product images, or marketing materials (JPG, PNG supported).</p>
            <div className="space-y-4">
               <div 
                className="relative border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
               >
                    <p className="text-muted-foreground">Drag & drop files or click to upload</p>
                    <Input 
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png, image/jpeg"
                        onChange={(e) => setAssets(Array.from(e.target.files || []))}
                        className="hidden"
                    />
                </div>
                {assets.length > 0 && (
                    <div>
                        <p className="font-medium text-sm mt-4">Selected files:</p>
                        <ul className="space-y-2 mt-2">
                            {assets.map((file, i) => <li key={i} className="text-sm text-muted-foreground">{file.name} ({Math.round(file.size / 1024)} KB)</li>)}
                        </ul>
                    </div>
                )}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-1">Target Market</h2>
            <p className="text-muted-foreground mb-6">Which region are you expanding into?</p>
             <div>
                <label className="text-sm font-medium">Select Market</label>
                <Select value={targetMarket} onChange={e => setTargetMarket(e.target.value)}>
                    {TARGET_MARKETS.map(market => <option key={market} value={market}>{market}</option>)}
                </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
           <button onClick={() => navigate('landing')} className="inline-flex items-center space-x-2">
            <Logo className="h-8 w-8 text-foreground" />
            <span className="font-bold text-lg">CulturalGPT</span>
          </button>
        </div>
        <div className="bg-card p-8 rounded-2xl shadow-lg border">
          <Progress value={progress} className="mb-8" />
          {renderStep()}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
            {step === 2 ? (
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" onClick={handleNext}>Skip</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            ) : step < totalSteps ? (
              <Button onClick={handleNext} disabled={(step === 1 && (!companyName || !description || !marketGoals))}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Generate Analysis</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
