import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Logo } from '../constants';

const RegisterPage: React.FC = () => {
    const { navigate, login } = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            // In a real app, you would register the user in your database.
            // Here, we'll just log them in directly.
            login({ name, email });
        } else {
            setError('Please fill out all fields.');
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
                            Create Account
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
