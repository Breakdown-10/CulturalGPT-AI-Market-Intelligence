import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

// Icons for Use Cases
const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.18-.65-.87-2.2-.86-3.05.05zm9-9c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.18-.65-.87-2.2-.86-3.05.05zm4.5 4.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.18-.65-.87-2.2-.86-3.05.05zM12 12s2 2 4 4"/><path d="m21.17 3.83-2.34 2.34-1.06 1.06-2.34 2.34-1.06 1.06-2.34 2.34-1.06 1.06-2.34 2.34-1.06 1.06-2.34 2.34"/></svg>
);
const ShoppingBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const FilmIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="7" x2="7" y1="3" y2="21"/><line x1="17" x2="17" y1="3" y2="21"/><line x1="3" x2="21" y1="8" y2="8"/><line x1="3" x2="21" y1="16" y2="16"/></svg>
);
const ShirtIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
);
const UtensilsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/></svg>
);
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);

// Icons for How It Works
const UploadCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-4.3 19.34"/><path d="M12 2a10 10 0 0 1 4.3 19.34"/><path d="M12 2a10 10 0 0 0-1.54 3.09"/><path d="M12 2a10 10 0 0 1 1.54 3.09"/><path d="M2 12a10 10 0 0 0 3.12 7.12"/><path d="M22 12a10 10 0 0 1-3.12 7.12"/><path d="M12 12a5 5 0 0 0-5 5"/><path d="M12 12a5 5 0 0 1 5 5"/><path d="M12 12a5 5 0 0 0-5-5"/><path d="M12 12a5 5 0 0 1 5-5"/><circle cx="12" cy="12" r="2"/><path d="M12 4V2"/><path d="M12 22v-2"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m18 6-1-1"/><path d="m7 18-1-1"/><path d="m6 6 1-1"/><path d="m17 18 1-1"/></svg>
);
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);

const FeatureCard = ({ icon, title, children }: { icon: string, title: string, children?: React.ReactNode }) => (
    <Card className="text-center backdrop-blur-sm bg-card/50 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-primary/20">
        <CardHeader>
            <div className="mx-auto text-5xl mb-4">{icon}</div>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);

// FIX: Changed icon type from JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
const UseCaseCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) => (
    <div className="scroll-animate" style={{ transitionDelay: delay }}>
        <Card className="text-center p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-primary/20">
            <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </Card>
    </div>
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const targets = document.querySelectorAll('.scroll-animate');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, []);
    
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
                            <Button size="lg" onClick={() => navigate('register')}>Analyze Brand</Button>
                            <Button size="lg" variant="outline" onClick={() => navigate('register')}>Try Demo</Button>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 scroll-animate">
                            <h2 className="text-3xl font-bold tracking-tight">Built for Every Industry</h2>
                            <p className="mt-4 text-lg text-muted-foreground">CulturalGPT adapts to your market — from tech to luxury fashion.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <UseCaseCard delay="0ms" icon={<RocketIcon className="w-8 h-8" />} title="Technology Startups" description="Launch new products globally with culturally-aware messaging." />
                            <UseCaseCard delay="100ms" icon={<ShoppingBagIcon className="w-8 h-8" />} title="Consumer Brands" description="Ensure your brand story resonates with local values and traditions." />
                            <UseCaseCard delay="200ms" icon={<FilmIcon className="w-8 h-8" />} title="Entertainment & Media" description="Adapt content and campaigns to fit diverse cultural contexts." />
                            <UseCaseCard delay="0ms" icon={<ShirtIcon className="w-8 h-8" />} title="Fashion & Lifestyle" description="Connect with consumers through authentic, culturally-relevant style." />
                            <UseCaseCard delay="100ms" icon={<UtensilsIcon className="w-8 h-8" />} title="Food & Hospitality" description="Localize menus and guest experiences for international audiences." />
                            <UseCaseCard delay="200ms" icon={<BarChartIcon className="w-8 h-8" />} title="Finance & Fintech" description="Build trust by aligning financial products with local economic attitudes." />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 md:py-28 bg-muted/40">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center scroll-animate">
                            <h2 className="text-3xl font-bold tracking-tight">Go Global, Feel Local</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Our platform provides a complete toolkit for international brand expansion.</p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                           <div className="scroll-animate" style={{ transitionDelay: '0ms' }}>
                                <FeatureCard icon="🔬" title="AI Analysis">
                                    Gemini-powered engine decodes your brand's DNA and compares it against cultural norms in your target market.
                                </FeatureCard>
                            </div>
                            <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
                                <FeatureCard icon="💡" title="Cultural Insights">
                                    Get actionable advice on messaging, color psychology, and consumer values to ensure your brand resonates.
                                </FeatureCard>
                            </div>
                            <div className="scroll-animate" style={{ transitionDelay: '300ms' }}>
                                <FeatureCard icon="🚀" title="Strategy Generation">
                                    Receive a comprehensive market-entry strategy, complete with recommendations, risk assessments, and a clear roadmap.
                                </FeatureCard>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* How It Works Section */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center scroll-animate">
                            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
                            <p className="mt-4 text-lg text-muted-foreground">From brand analysis to strategy — here’s what happens behind the scenes.</p>
                        </div>
                        <div className="relative mt-20">
                            <div aria-hidden="true" className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-border -z-10"></div>
                            <div className="relative grid md:grid-cols-4 gap-x-8 gap-y-12">
                                <div className="text-center scroll-animate" style={{ transitionDelay: '0ms' }}>
                                    <div className="mx-auto h-20 w-20 flex items-center justify-center bg-background border-2 border-primary rounded-full text-primary relative">
                                        <UploadCloudIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">Upload Assets</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Provide your brand name, description, and visual assets like logos.</p>
                                </div>
                                <div className="text-center scroll-animate" style={{ transitionDelay: '150ms' }}>
                                    <div className="mx-auto h-20 w-20 flex items-center justify-center bg-background border-2 border-primary rounded-full text-primary relative">
                                        <BrainCircuitIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">AI Analysis</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Gemini analyzes your brand's DNA against the target market's cultural norms.</p>
                                </div>
                                <div className="text-center scroll-animate" style={{ transitionDelay: '300ms' }}>
                                    <div className="mx-auto h-20 w-20 flex items-center justify-center bg-background border-2 border-primary rounded-full text-primary relative">
                                        <GlobeIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">Get Insights</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Receive cultural alignment scores, risk mapping, and localization advice.</p>
                                </div>
                                <div className="text-center scroll-animate" style={{ transitionDelay: '450ms' }}>
                                    <div className="mx-auto h-20 w-20 flex items-center justify-center bg-background border-2 border-primary rounded-full text-primary relative">
                                        <FileTextIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">Generate Report</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">A full market-entry strategy and actionable report is generated instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                 {/* Testimonials Section */}
                <section className="py-20 md:py-28 bg-muted/40">
                    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                         <div className="text-center scroll-animate">
                            <h2 className="text-3xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
                            <p className="mt-4 text-lg text-muted-foreground">See how global brands are using CulturalGPT to win new markets.</p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-2 gap-8">
                           <div className="scroll-animate" style={{ transitionDelay: '0ms' }}>
                               <TestimonialCard 
                                    quote="CulturalGPT was a game-changer for our launch in Japan. The insights were incredibly accurate and saved us months of research."
                                    author="Sarah Johnson"
                                    title="CMO, Nexus Wearables"
                               />
                           </div>
                           <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
                               <TestimonialCard 
                                    quote="The strategy report gave our leadership team the confidence to invest in the Brazilian market. The AI-generated roadmap was our north star."
                                    author="Marco Bianchi"
                                    title="Head of Global Expansion, Fintech Solutions"
                               />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;