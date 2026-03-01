import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', exact: true },
    { path: '/dashboard/subjects', icon: 'school', label: 'Classrooms', exact: false },
    { path: '/dashboard/chat-history', icon: 'chat', label: 'Chat', exact: false },
    { path: '/dashboard/api-settings', icon: 'settings', label: 'Settings', exact: false },
];

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path, exact) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark h-full flex-shrink-0">
            <div className="flex flex-col h-full justify-between p-4">
                <div className="flex flex-col gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-center bg-no-repeat bg-cover rounded-lg size-10 shadow-lg shadow-primary/20" data-alt="Abstract geometric blue pattern" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8hXoCpV0oafAAdD4F93mwuYlYKnBzjDP2ByJVerQCD__TRZekfd_fD3w0u5TlAjc2wQorUQJ1QCdD4q4VtIpL5ZXyZt5_Kuj4pPdDRY-siHqvRrd4ASHqmdlYsiwHxQY1TlYAs6L51qRhvhXp3RcaMbMdZRFwxPdGkQbORuDxE1LqzZkXh6H-SiXhyiMMsM6XQUXAZqeheqIgxmYeJFLAvLsizdgjm4z78r0R4_wKH4eFJiAKvs8JVwUDRkXLUG4UUpvQKeJlLqQ")' }}></div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">ClassMind AI</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Teacher Edition</p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const active = isActive(item.path, item.exact);
                            return (
                                <Link
                                    key={item.path}
                                    className={active
                                        ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:text-primary font-medium"
                                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"}
                                    to={item.path}
                                >
                                    <span className={`material-symbols-outlined text-[24px] ${active ? 'fill-current' : 'group-hover:text-primary transition-colors'}`}>{item.icon}</span>
                                    <span className={active ? "text-sm" : "text-sm font-medium"}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                {/* Bottom Actions */}
                <div className="flex flex-col gap-2">
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" to="#">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">account_circle</span>
                        <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group" to="/">
                        <span className="material-symbols-outlined text-[24px] group-hover:text-red-400 transition-colors">logout</span>
                        <span className="text-sm font-medium">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
