import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Logo } from '../constants';

const RegisterPage: React.FC = () => {
    const { navigate, register } = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password);
             // Navigation is handled automatically by the App's auth listener
        } catch (err: any) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('This email address is already registered.');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters long.');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                default:
                    setError('An unexpected error occurred. Please try again.');
                    console.error(err);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/40 flex flex-col items-center justify-center p-4">
            <button onClick={() => navigate('landing')} className="flex items-center space-x-2 mb-8">
                <Logo className="h-8 w-8 text-foreground" />
                <span className="font-bold text-lg">CulturalGPT</span>
            </button>
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Start your global journey with us.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name">Full Name</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                             {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <button onClick={() => navigate('login')} className="underline text-primary">
                            Log In
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
