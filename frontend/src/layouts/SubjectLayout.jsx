import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';

const SubjectLayout = () => {
    const { subjectId } = useParams();

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
            {/* Breadcrumbs & Header */}
            <div className="flex-shrink-0 px-6 py-6 md:px-10 md:py-8">
                <div className="flex flex-wrap gap-2 items-center mb-4 text-sm font-medium">
                    <NavLink to="/dashboard/subjects" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Subjects</NavLink>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-slate-900 dark:text-slate-100">{subjectId || 'AP Physics 1'}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex gap-5 items-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-4xl">functions</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{subjectId || 'AP Physics 1'}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Mechanics and Kinematics • Period 3</p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 h-10 px-5 bg-surface-dark dark:bg-surface-dark border border-sub-border-dark hover:border-primary/50 text-slate-200 text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 group">
                        <span className="material-symbols-outlined text-[20px] group-hover:animate-spin">sync</span>
                        <span>Reindex All</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex-shrink-0 px-6 md:px-10 border-b border-slate-200 dark:border-border-dark">
                <div className="flex gap-8">
                    <NavLink
                        to={`/dashboard/subjects/${subjectId}/materials`}
                        className={({ isActive }) =>
                            `relative pb-4 px-1 text-sm font-bold transition-colors border-b-2 ${isActive
                                ? 'text-primary border-primary'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                            }`
                        }
                    >
                        Materials
                        <span className="absolute -top-2 -right-3 bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full">12</span>
                    </NavLink>
                    <NavLink
                        to={`/dashboard/subjects/${subjectId}/chat`}
                        className={({ isActive }) =>
                            `pb-4 px-1 text-sm font-bold transition-all border-b-2 ${isActive
                                ? 'text-primary border-primary'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                            }`
                        }
                    >
                        Chat Context
                    </NavLink>
                    <NavLink
                        to={`/dashboard/subjects/${subjectId}/quizzes`}
                        className={({ isActive }) =>
                            `pb-4 px-1 text-sm font-bold transition-all border-b-2 ${isActive
                                ? 'text-primary border-primary'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                            }`
                        }
                    >
                        Quizzes
                    </NavLink>
                </div>
            </div>

            {/* Scrollable Content */}
            <Outlet />
        </div>
    );
};

export default SubjectLayout;
