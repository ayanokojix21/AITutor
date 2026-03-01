import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.className = "bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200 min-h-screen overflow-hidden flex";
        return () => {
            document.documentElement.classList.remove('dark');
            document.body.className = "";
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/*  Sidebar  */}
            <aside className={`w-64 bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-screen transition-all duration-300 z-20 ${isMobileMenuOpen ? 'fixed left-0 top-0 shadow-2xl' : 'hidden md:flex'}`}>
                {/* Mobile close button */}
                <div className="md:hidden absolute top-4 right-4 z-30">
                    <button onClick={toggleMobileMenu} className="p-2 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="flex flex-col gap-4 p-4 mt-8 md:mt-0">
                    {/*  Brand  */}
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="bg-gradient-to-tr from-primary to-blue-600 rounded-lg w-10 h-10 flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>school</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">ClassMind AI</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Learning Assistant</p>
                        </div>
                    </div>
                    {/*  Navigation  */}
                    <nav className="flex flex-col gap-2">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}\`
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                            <span className="text-sm">Dashboard</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/subjects"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}\`
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">class</span>
                            <span className="text-sm">Classrooms</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/chat-history"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}\`
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">history</span>
                            <span className="text-sm">Chat History</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/files"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">folder_open</span>
                            <span className="text-sm">Files</span>
                        </NavLink>

                        <div className="pt-4 pb-2">
                            <p className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Settings</p>
                        </div>
                        <NavLink
                            to="/dashboard/api-settings"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}\`
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm">Settings</span>
                        </NavLink >
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}\`
                            `}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined">person</span>
                            <span className="text-sm">Profile</span>
                        </NavLink>
                    </nav>
                </div>
                {/*  Logout  */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/*  Main Content  */}
            <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
                {/*  Header  */}
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleMobileMenu} className="md:hidden p-2 text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="hidden md:flex items-center text-slate-900 dark:text-white font-bold text-lg tracking-tight">
                            Overview
                        </div>
                    </div>
                    {/*  Search and Actions  */}
                    <div className="flex items-center gap-6">
                        {/*  Search Bar  */}
                        <div className="relative hidden sm:block w-64 lg:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400">search</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2 border-none rounded-xl leading-5 bg-slate-200/50 dark:bg-surface-dark text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-all" placeholder="Search classrooms, documents..." type="text" />
                        </div>
                        {/*  Notifications & Profile  */}
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
                            </button>
                            <div className="h-8 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1"></div>
                            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9 ring-2 ring-transparent group-hover:ring-primary transition-all" data-alt="User profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgWzH_69cHsEVZEdH8bIrQb4TLDVx02RFiYwuafi_IeySRFf0qJma-dnpdD1W9MbjD5ZUqHjZIYZ-MyWuGeZ4vZ36N4Bd3IrICFJ1tBwP-gtjm1Ogl2Ag3wBobjxsS4KzwUUzwExFvsX93vjsyGky4yBw_rZrxMxzZhdhjmcaEDrQ9dnAWjOqYRScxG3VrOrnLTrEs2baHl05ERFQ0QQAJIbdVIynOR9WONwnHzfhohGxWENQtCieZJfcHtl10T-V3TXxS6bhXWQI")' }}></div>
                                <div className="hidden lg:block">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || "User"}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.plan || "Free Plan"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/*  Scrollable Content injected by Router  */}
                <Outlet />
            </main>
        </>
    );
};

export default DashboardLayout;
