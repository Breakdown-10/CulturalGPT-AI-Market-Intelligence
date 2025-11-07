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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a mock login. In a real app, you'd validate against a backend.
        if (email && password) {
            // For demonstration, we'll log in any user with a non-empty email/password
            // and derive a name from the email.
            const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            login({ name, email });
        } else {
            setError('Please enter both email and password.');
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
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full">
                            Log In
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
