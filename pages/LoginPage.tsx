import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Logo } from '../constants';

const LoginPage: React.FC = () => {
    const { navigate, login } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            // Navigation is handled automatically by the App's auth listener
        } catch (err: any) {
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('Invalid email or password.');
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
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Log in to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('register')} className="underline text-primary">
                            Register
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
