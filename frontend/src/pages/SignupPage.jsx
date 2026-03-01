import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased selection:bg-primary/30 selection:text-primary min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden auth-background items-center justify-center p-4">
                {/* Decorative Glow Behind Card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] pointer-events-none opacity-40"></div>

                {/* Auth Card */}
                <div className="glass-card relative w-full max-w-[420px] rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500">

                    {/* Logo Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-lg shadow-primary/10">
                            <span className="material-symbols-outlined text-[32px]">school</span>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold font-sora tracking-tight text-slate-900 dark:text-white">
                                ClassMind AI
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                                Your AI-powered learning assistant connected to Google Classroom.
                            </p>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="w-full flex flex-col gap-4">
                        <button onClick={handleLogin} className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl h-12 px-5 bg-slate-100 dark:bg-white text-slate-900 transition-all hover:bg-slate-200 hover:scale-[1.01] active:scale-[0.99] shadow-sm font-semibold">
                            <img alt="Google Logo" className="w-5 h-5" data-alt="Google G logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9tK9AkBcwQWgKiI2ZqDk3qTHpgkpMW8vOAhUoI4qtNGgcaWv2Xx0kTbNMrG_gz97eaJ68pkN1TKV8lEK-XIGFhA_fv7XBt_VapYm7SwrI5z03BsSUfzjgBD1UcjhIFzo7r3HIgxrvEZjyLe62f9BfXPAm_OSYvmYLN__PCh6VeItLDWySKCHvtsntbNAZuKDXnbIW6P4DdDKJU5Ly1iolZKO4y8p9stsVRi3XFfIQ8-SxtmJugIcTjvudV6HOAaN9k7FS-PozaCY" />
                            <span>Continue with Google</span>
                        </button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-medium">or</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleLogin} className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                                Log In
                            </button>
                            <button onClick={handleLogin} className="flex-1 h-10 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-4 flex flex-col gap-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            By continuing, you agree to our{' '}
                            <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary underline decoration-slate-400/30 underline-offset-2 transition-colors" href="#">Terms</a>
                            {' '}and{' '}
                            <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary underline decoration-slate-400/30 underline-offset-2 transition-colors" href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                {/* Bottom copyright */}
                <footer className="absolute bottom-6 w-full text-center">
                    <p className="text-slate-500/60 dark:text-slate-500/60 text-xs font-medium tracking-wide">
                        © 2024 ClassMind AI. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default SignupPage;
