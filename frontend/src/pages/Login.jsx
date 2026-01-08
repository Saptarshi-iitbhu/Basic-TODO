import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CheckSquare } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/sign-in', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900/50 p-8 shadow-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
                        <CheckSquare className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-400">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 text-center border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
