import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Header */}
                    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <button className="md:hidden p-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="hidden md:flex items-center text-slate-900 dark:text-white font-bold text-lg tracking-tight">
                                Overview
                            </div>
                        </div>
                        {/* Search and Actions */}
                        <div className="flex items-center gap-6">
                            {/* Search Bar */}
                            <div className="relative hidden sm:block w-64 lg:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400">search</span>
                                </div>
                                <input className="block w-full pl-10 pr-3 py-2 border-none rounded-xl leading-5 bg-slate-200/50 dark:bg-surface-dark text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-all" placeholder="Search classrooms, documents..." type="text" />
                            </div>
                            {/* Notifications & Profile */}
                            <div className="flex items-center gap-3">
                                <button className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
                                </button>
                                <div className="h-8 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1"></div>
                                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9 ring-2 ring-transparent group-hover:ring-primary transition-all" data-alt="User profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgWzH_69cHsEVZEdH8bIrQb4TLDVx02RFiYwuafi_IeySRFf0qJma-dnpdD1W9MbjD5ZUqHjZIYZ-MyWuGeZ4vZ36N4Bd3IrICFJ1tBwP-gtjm1Ogl2Ag3wBobjxsS4KzwUUzwExFvsX93vjsyGky4yBw_rZrxMxzZhdhjmcaEDrQ9dnAWjOqYRScxG3VrOrnLTrEs2baHl05ERFQ0QQAJIbdVIynOR9WONwnHzfhohGxWENQtCieZJfcHtl10T-V3TXxS6bhXWQI")' }}></div>
                                    <div className="hidden lg:block">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Student Account</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Pro Plan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Greeting */}
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Good morning, Alex! <span className="text-2xl">👋</span></h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base">Here's what's happening with your classes today.</p>
                            </div>
                            {/* Stats Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Stat Card 1 */}
                                <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-primary">library_books</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined">library_books</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Subjects</p>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">8</h3>
                                        <span className="text-emerald-500 text-sm font-medium mb-1 flex items-center">
                                            <span className="material-symbols-outlined text-sm">trending_up</span> +2 this week
                                        </span>
                                    </div>
                                </div>
                                {/* Stat Card 2 */}
                                <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-blue-400">folder_special</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                                            <span className="material-symbols-outlined">folder_special</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Materials Indexed</p>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">142</h3>
                                        <span className="text-emerald-500 text-sm font-medium mb-1 flex items-center">
                                            <span className="material-symbols-outlined text-sm">add</span> 15 new files
                                        </span>
                                    </div>
                                </div>
                                {/* Stat Card 3 */}
                                <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-purple-400">chat</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400">
                                            <span className="material-symbols-outlined">chat</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Chats</p>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">24</h3>
                                        <span className="text-slate-400 text-sm font-medium mb-1">
                                            Last active 2m ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Your Classrooms Section */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">school</span>
                                        Your Classrooms
                                    </h3>
                                    <Link className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1" to="/dashboard/subjects">
                                        View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                    {/* Classroom Card 1 */}
                                    <div className="group relative bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                        <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">sync</span> Auto-Sync On
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 relative">
                                            <div className="absolute -top-10 left-5 h-16 w-16 bg-surface-light dark:bg-surface-dark rounded-xl p-1 shadow-sm">
                                                <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <span className="material-symbols-outlined text-3xl">data_object</span>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex flex-col gap-1">
                                                <Link to="/dashboard/subjects/cs201"><h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">Data Structures</h4></Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">CS-201 • Prof. Alan Turing</p>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5" title="Documents indexed">
                                                    <span className="material-symbols-outlined text-lg">description</span>
                                                    <span>24 Files</span>
                                                </div>
                                                <div className="flex items-center gap-1.5" title="Last updated">
                                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                                    <span>2h ago</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-full">
                                                    <span className="material-symbols-outlined text-xs font-bold">check_circle</span> INDEXED
                                                </div>
                                                <Link to="/dashboard/subjects/cs201/chat" className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors inline-block">
                                                    <span className="material-symbols-outlined">chat_bubble</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Classroom Card 2 */}
                                    <div className="group relative bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                        <div className="h-24 bg-gradient-to-r from-emerald-600 to-teal-400 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">sync</span> Auto-Sync On
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 relative">
                                            <div className="absolute -top-10 left-5 h-16 w-16 bg-surface-light dark:bg-surface-dark rounded-xl p-1 shadow-sm">
                                                <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                    <span className="material-symbols-outlined text-3xl">database</span>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex flex-col gap-1">
                                                <Link to="/dashboard/subjects/cs304"><h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">Database Management</h4></Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">CS-304 • Prof. Ada Lovelace</p>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">description</span>
                                                    <span>48 Files</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                                    <span>5h ago</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-full">
                                                    <span className="material-symbols-outlined text-xs font-bold">check_circle</span> INDEXED
                                                </div>
                                                <Link to="/dashboard/subjects/cs304/chat" className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors inline-block">
                                                    <span className="material-symbols-outlined">chat_bubble</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Classroom Card 3 */}
                                    <div className="group relative bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                        <div className="h-24 bg-gradient-to-r from-orange-500 to-amber-400 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                        </div>
                                        <div className="p-5 relative">
                                            <div className="absolute -top-10 left-5 h-16 w-16 bg-surface-light dark:bg-surface-dark rounded-xl p-1 shadow-sm">
                                                <div className="w-full h-full bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                    <span className="material-symbols-outlined text-3xl">psychology</span>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex flex-col gap-1">
                                                <Link to="/dashboard/subjects/cs450"><h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">Machine Learning</h4></Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">CS-450 • Prof. Hinton</p>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">description</span>
                                                    <span>15 Files</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                                    <span>1d ago</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold px-2 py-1 bg-amber-500/10 rounded-full">
                                                    <span className="material-symbols-outlined text-xs font-bold">sync</span> SYNCING
                                                </div>
                                                <Link to="/dashboard/subjects/cs450/chat" className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors inline-block">
                                                    <span className="material-symbols-outlined">chat_bubble</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Classroom Card 4 */}
                                    <div className="group relative bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                        <div className="h-24 bg-gradient-to-r from-purple-600 to-indigo-400 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                        </div>
                                        <div className="p-5 relative">
                                            <div className="absolute -top-10 left-5 h-16 w-16 bg-surface-light dark:bg-surface-dark rounded-xl p-1 shadow-sm">
                                                <div className="w-full h-full bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                    <span className="material-symbols-outlined text-3xl">design_services</span>
                                                </div>
                                            </div>
                                            <div className="mt-8 flex flex-col gap-1">
                                                <Link to="/dashboard/subjects/des101"><h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">UI/UX Design</h4></Link>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">DES-101 • Prof. Norman</p>
                                            </div>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">description</span>
                                                    <span>32 Files</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                                    <span>3d ago</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-full">
                                                    <span className="material-symbols-outlined text-xs font-bold">check_circle</span> INDEXED
                                                </div>
                                                <Link to="/dashboard/subjects/des101/chat" className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors inline-block">
                                                    <span className="material-symbols-outlined">chat_bubble</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Recent Activity */}
                            <div className="flex flex-col gap-4 pb-10">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">history</span>
                                    Recent Queries
                                </h3>
                                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {/* Item 1 */}
                                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                                                    <span className="material-symbols-outlined">smart_toy</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary">Explain B-Trees vs B+ Trees</h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Data Structures • 25 mins ago</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                        </div>
                                        {/* Item 2 */}
                                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-2 rounded-lg">
                                                    <span className="material-symbols-outlined">smart_toy</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary">What is Normalization in DBMS?</h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Database Management • 2 hours ago</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
