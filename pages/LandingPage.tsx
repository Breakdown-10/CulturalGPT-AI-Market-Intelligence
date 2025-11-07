import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

// FIX: Made the `children` prop optional to resolve a TypeScript error where it was incorrectly reported as missing.
const FeatureCard = ({ icon, title, children }: { icon: string, title: string, children?: React.ReactNode }) => (
    <Card className="text-center backdrop-blur-sm bg-card/50">
        <CardHeader>
            <div className="mx-auto text-5xl mb-4">{icon}</div>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);

const TestimonialCard = ({ quote, author, title }: { quote: string, author: string, title: string }) => (
    <Card>
        <CardContent className="pt-6">
            <blockquote className="italic">"{quote}"</blockquote>
            <p className="font-bold mt-4">{author}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
        </CardContent>
    </Card>
);

const LandingPage = () => {
    const { navigate } = useContext(AppContext);
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
                    >
                        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                    </div>
                    <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Cultural Intelligence for Global Brands
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                            Unlock new markets with AI-powered insights. Understand cultural fit, perfect your tone, and connect with consumers on a deeper level.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button size="lg" onClick={() => navigate('analyze')}>Analyze Brand</Button>
                            <Button size="lg" variant="outline" onClick={() => navigate('analyze')}>Try Demo</Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 md:py-28 bg-muted/40">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight">Go Global, Feel Local</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Our platform provides a complete toolkit for international brand expansion.</p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                            <FeatureCard icon="🔬" title="AI Analysis">
                                Gemini-powered engine decodes your brand's DNA and compares it against cultural norms in your target market.
                            </FeatureCard>
                             <FeatureCard icon="💡" title="Cultural Insights">
                                Get actionable advice on messaging, color psychology, and consumer values to ensure your brand resonates.
                            </FeatureCard>
                             <FeatureCard icon="🚀" title="Strategy Generation">
                                Receive a comprehensive market-entry strategy, complete with recommendations, risk assessments, and a clear roadmap.
                            </FeatureCard>
                        </div>
                    </div>
                </section>

                 {/* Testimonials Section */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                         <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
                            <p className="mt-4 text-lg text-muted-foreground">See how global brands are using CulturalGPT to win new markets.</p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-2 gap-8">
                           <TestimonialCard 
                                quote="CulturalGPT was a game-changer for our launch in Japan. The insights were incredibly accurate and saved us months of research."
                                author="Sarah Johnson"
                                title="CMO, Nexus Wearables"
                           />
                           <TestimonialCard 
                                quote="The strategy report gave our leadership team the confidence to invest in the Brazilian market. The AI-generated roadmap was our north star."
                                author="Marco Bianchi"
                                title="Head of Global Expansion, Fintech Solutions"
                           />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;