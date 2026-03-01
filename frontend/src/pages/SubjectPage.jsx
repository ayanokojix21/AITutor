import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SubjectPage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Breadcrumbs & Header */}
                    <div className="flex-shrink-0 px-6 py-6 md:px-10 md:py-8">
                        <div className="flex flex-wrap gap-2 items-center mb-4 text-sm font-medium">
                            <Link className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="/dashboard/subjects">Subjects</Link>
                            <span className="text-slate-300 dark:text-slate-600">/</span>
                            <span className="text-slate-900 dark:text-slate-100">AP Physics 1</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex gap-5 items-center">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white flex-shrink-0">
                                    <span className="material-symbols-outlined text-4xl">functions</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">AP Physics 1</h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Mechanics and Kinematics • Period 3</p>
                                </div>
                            </div>
                            <button className="flex items-center justify-center gap-2 h-10 px-5 bg-surface-dark dark:bg-surface-dark border border-[#3a4d55] hover:border-primary/50 text-slate-200 text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 group">
                                <span className="material-symbols-outlined text-[20px] group-hover:animate-spin">sync</span>
                                <span>Reindex All</span>
                            </button>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex-shrink-0 px-6 md:px-10 border-b border-slate-200 dark:border-[#3a4d55]">
                        <div className="flex gap-8">
                            <Link className="relative pb-4 px-1 text-sm font-bold text-primary border-b-2 border-primary transition-colors" to="#">
                                Materials
                                <span className="absolute -top-2 -right-3 bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full">12</span>
                            </Link>
                            <Link className="pb-4 px-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all" to="/dashboard/subjects/cs201/chat">
                                Chat Context
                            </Link>
                            <Link className="pb-4 px-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all" to="/dashboard/subjects/cs201/quizzes">
                                Quizzes
                            </Link>
                        </div>
                    </div>
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        {/* Filter Bar */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative w-full max-w-sm group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                </div>
                                <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl leading-5 bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm shadow-sm" placeholder="Search files..." type="text" />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">view_module</span>
                                </button>
                            </div>
                        </div>
                        {/* Files Table */}
                        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-[#3a4d55] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-[#3a4d55] bg-slate-50 dark:bg-black/20">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">File Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Size</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Index Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-[#3a4d55]">
                                        {/* Row 1 */}
                                        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Kinematics_Lecture_Notes.pdf</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-500">Google Drive</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                    PDF
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                2.4 MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                2 hours ago
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <span className="material-symbols-outlined text-[18px] fill-1">check_circle</span>
                                                    <span className="text-xs font-bold">Indexed</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                                        <span className="material-symbols-outlined text-[20px]">description</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Newton_Laws_Worksheet.docx</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-500">Uploaded</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                    DOCX
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                1.1 MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                Yesterday
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <span className="material-symbols-outlined text-[18px] fill-1">check_circle</span>
                                                    <span className="text-xs font-bold">Indexed</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Lab_Report_Template.pdf</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-500">Google Drive</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                    PDF
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                0.5 MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                Oct 24, 2023
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <span className="material-symbols-outlined text-[18px] fill-1">check_circle</span>
                                                    <span className="text-xs font-bold">Indexed</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 4 */}
                                        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Chapter_3_Summary.pdf</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-500">Google Drive</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                    PDF
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                3.2 MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                Oct 20, 2023
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-yellow-500">
                                                    <span className="material-symbols-outlined text-[18px] animate-pulse">sync</span>
                                                    <span className="text-xs font-bold">Processing</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Row 5 */}
                                        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Midterm_Review_Packet.pdf</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-500">Uploaded</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                    PDF
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                5.8 MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                Oct 15, 2023
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <span className="material-symbols-outlined text-[18px] fill-1">check_circle</span>
                                                    <span className="text-xs font-bold">Indexed</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination (Simplified) */}
                            <div className="px-6 py-4 border-t border-slate-200 dark:border-[#3a4d55] flex items-center justify-between">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Showing 1-5 of 12 files</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#3a4d55] rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1 text-xs font-bold text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-[#3a4d55] rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SubjectPage;
