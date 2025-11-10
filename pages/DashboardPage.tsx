
import React, { useContext, useState, useEffect } from 'react';
import type { BrandAnalysis } from '../types';
import { AppContext } from '../contexts/AppContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import Loader from '../components/Loader';

const StatusBadge: React.FC<{ status: BrandAnalysis['status'] }> = ({ status }) => {
    const statusClasses = {
        Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        Failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
}

const DashboardPage: React.FC = () => {
    const { navigate, user } = useContext(AppContext);
    const [analyses, setAnalyses] = useState<BrandAnalysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyses = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            };

            setIsLoading(true);
            try {
                const analysesCollectionRef = collection(db, 'users', user.uid, 'analyses');
                const q = query(analysesCollectionRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedAnalyses = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const createdAtTimestamp = data.createdAt as Timestamp;
                    return {
                        id: doc.id,
                        brandName: data.brandName,
                        targetMarket: data.targetMarket,
                        status: data.status,
                        createdAt: createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString(),
                    } as BrandAnalysis;
                });
                setAnalyses(fetchedAnalyses);
            } catch (error) {
                console.error("Error fetching analyses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalyses();
    }, [user]);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-full">
                    <Loader message="Loading projects..." />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
            </div>
            {analyses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {analyses.map((analysis) => (
                        <Card key={analysis.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{analysis.brandName}</CardTitle>
                                    <StatusBadge status={analysis.status} />
                                </div>
                                <CardDescription>Target Market: {analysis.targetMarket}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Created on {new Date(analysis.createdAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => navigate('results', analysis.id)}>
                                    View Report
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h2 className="text-xl font-semibold">No analyses yet</h2>
                    <p className="text-muted-foreground mt-2">Start your first cultural analysis to unlock global markets.</p>
                    <Button className="mt-6" onClick={() => navigate('analyze')}>Start New Analysis</Button>
                </div>
            )}
        </DashboardLayout>
    );
};

export default DashboardPage;
