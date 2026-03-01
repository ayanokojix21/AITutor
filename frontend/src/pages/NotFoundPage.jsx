import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 p-6 text-center">
            <span className="material-symbols-outlined text-8xl text-primary mb-6 animate-bounce">
                sentiment_dissatisfied
            </span>
            <h1 className="text-6xl font-black tracking-tighter mb-4">404</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                Oops! Looks like this page wandered off to the wrong classroom.
            </p>
            <a
                href="/dashboard"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Back to Dashboard
            </a>
        </div>
    );
};

export default NotFoundPage;
