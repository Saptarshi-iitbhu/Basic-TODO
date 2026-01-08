import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut, User } from 'lucide-react';
import { Button } from './Button';

export const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return <div className="min-h-screen bg-slate-950">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-80 transition-opacity">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <CheckSquare className="w-5 h-5 text-white" />
                        </div>
                        TaskFlow
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-white">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};
