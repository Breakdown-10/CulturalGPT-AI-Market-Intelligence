
import React, { useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { AppContext } from '../contexts/AppContext';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const PricingPlan = ({ plan, isPopular }: { plan: any, isPopular?: boolean }) => {
    const { navigate } = useContext(AppContext);

    return (
        <Card className={`flex flex-col ${isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
            {isPopular && (
                <div className="px-3 py-1 text-sm font-semibold text-primary-foreground bg-primary rounded-t-2xl text-center">
                    Most Popular
                </div>
            )}
            <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-3">
                    {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon />
                            <span className="ml-2 text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button 
                    className="w-full mt-8" 
                    variant={isPopular ? 'primary' : 'outline'}
                    onClick={() => navigate('analyze')}
                >
                    {plan.cta}
                </Button>
            </CardContent>
        </Card>
    );
};

const PricingPage = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: '/month',
            description: 'For individuals and small teams getting started.',
            features: [
                '1 analysis per month',
                'Basic report generation',
                'Standard cultural insights',
                'Community support'
            ],
            cta: 'Get Started'
        },
        {
            name: 'Premium',
            price: '$49',
            period: '/month',
            description: 'For growing businesses that need more power and insights.',
            features: [
                '10 analyses per month',
                'Detailed PDF reports',
                'Advanced cultural insights',
                'Brand asset analysis (images)',
                'Priority email support'
            ],
            cta: 'Upgrade Now'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For large organizations with custom needs.',
            features: [
                'Unlimited analyses',
                'Custom integrations & API access',
                'Dedicated account manager',
                'Team collaboration features',
                '24/7 priority support'
            ],
            cta: 'Contact Sales'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="py-20 md:py-28 bg-muted/20">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                Find the Perfect Plan for Your Brand
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Whether you're just starting out or scaling globally, we have a plan that fits your needs.
                            </p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            <PricingPlan plan={plans[0]} />
                            <PricingPlan plan={plans[1]} isPopular />
                            <PricingPlan plan={plans[2]} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PricingPage;
