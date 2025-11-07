import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

const AccountPage: React.FC = () => {
    const { user, logout } = useContext(AppContext);

    if (!user) {
        return (
            <DashboardLayout>
                <p>Loading user data...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Account</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                            <p>{user.email}</p>
                        </div>
                         <Button variant="outline" className="mt-2">Edit Profile</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Subscription</CardTitle>
                        <CardDescription>Your current plan details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                            <p className="font-semibold text-primary">Premium</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Next Billing Date</p>
                            <p>July 30, 2024</p>
                        </div>
                        <Button variant="outline" className="mt-2">Manage Subscription</Button>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Button variant="destructive" onClick={logout}>
                            Log Out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default AccountPage;
