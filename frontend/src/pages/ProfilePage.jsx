import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-background-light dark:bg-background-dark relative">
                    <h1 className="text-3xl font-bold mb-6">User Profile</h1>
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border border-slate-200 dark:border-border-dark shadow-sm">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 bg-center bg-cover border-4 border-white dark:border-surface-dark shadow-md" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_tkj1e5c8eCddcs4hNdXXBy4U7f3RdqsRn5PmMfwCg1tBSKbPPxQZorCUbuYofEVEaqCbg0sK2_VocoW1uu-7J_GAP68mtvGCCfgS7o0NODg5ndyJO2PLB2qweadVd9Yto4qryAZdLAk3RPSGeEMTgWa6J7UDvdvWKcgcILztsZbM4SLRacjwUc99kUFZgBzbqLpSP6q6mrKlbxG7rNyhbzoKJrBbk1u101eXC-eDKSD7-3vyUjHz_LZEagQxmoTtGNDFf0I9tiI")' }}></div>
                            <div>
                                <h2 className="text-2xl font-bold">John Doe</h2>
                                <p className="text-slate-500 dark:text-slate-400">john.doe@example.com</p>
                                <span className="inline-block mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Premium Plan</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold border-b border-slate-200 dark:border-border-dark pb-2 mb-4">Account Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                                        <input type="text" className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                                        <input type="text" className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="Doe" />
                                    </div>
                                </div>
                            </div>

                            <button className="bg-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-primary/90 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
