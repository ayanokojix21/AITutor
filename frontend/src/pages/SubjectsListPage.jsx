import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SubjectsListPage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);
    // Mock user subjects
    const subjects = [
        { id: 'ap-physics-1', name: 'AP Physics 1', instructor: 'Dr. Smith', color: 'from-indigo-500 to-purple-600', icon: 'functions' },
        { id: 'calculus-bc', name: 'Calculus BC', instructor: 'Mrs. Johnson', color: 'from-blue-500 to-cyan-500', icon: 'calculate' },
        { id: 'world-history', name: 'World History', instructor: 'Mr. Davis', color: 'from-amber-500 to-orange-500', icon: 'public' },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-background-light dark:bg-background-dark relative">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Subjects</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and access your course materials.</p>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-sm shadow-primary/20">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Join Class
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject) => (
                            <Link key={subject.id} to={`/dashboard/subjects/${subject.id}/materials`} className="group block">
                                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all h-full flex flex-col">
                                    <div className={`h-32 bg-gradient-to-br ${subject.color} relative p-6 flex items-end`}>
                                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm p-2 rounded-xl text-white">
                                            <span className="material-symbols-outlined">{subject.icon}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white drop-shadow-md">{subject.name}</h2>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow justify-between">
                                        <div className="mb-4">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{subject.instructor}</p>
                                            <div className="flex items-center gap-4 mt-4 text-xs text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">folder</span>
                                                    12 Materials
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">quiz</span>
                                                    3 Quizzes
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Open Subject <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubjectsListPage;
