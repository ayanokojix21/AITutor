import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './ChatPage.css';

const ChatPage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                <main className="flex-1 flex flex-row h-full overflow-hidden relative bg-background-dark">
                    {/* Context Sidebar (Left Panel) */}
                    <aside className="w-[320px] flex-shrink-0 border-r border-[#27343a] bg-[#161b1e] flex flex-col hidden lg:flex">
                        <div className="p-6 border-b border-[#27343a]">
                            <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">school</span>
                                Study Context
                            </h2>
                            <p className="text-[#9bb1bb] text-sm mt-1">Configure your learning scope</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {/* Subject Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#9bb1bb] text-xs font-bold uppercase tracking-wider">Current Subject</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#1b2427] border border-[#3a4d55] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer hover:border-[#5a6d75] transition-colors">
                                        <option>AP Physics 1</option>
                                        <option>Calculus BC</option>
                                        <option>World History</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            {/* Unit Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#9bb1bb] text-xs font-bold uppercase tracking-wider">Active Unit</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#1b2427] border border-[#3a4d55] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer hover:border-[#5a6d75] transition-colors">
                                        <option>Unit 3: Kinematics</option>
                                        <option>Unit 1: One-Dimensional Motion</option>
                                        <option>Unit 2: Vectors</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            {/* Context Chips */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[#9bb1bb] text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                                    Active Resources
                                    <button className="text-primary hover:text-white transition-colors text-xs">Manage</button>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all text-sm w-full justify-start group">
                                        <span className="material-symbols-outlined text-lg">book</span>
                                        <span className="truncate">Textbook: Chap 3</span>
                                        <span className="material-symbols-outlined text-sm ml-auto opacity-0 group-hover:opacity-100">close</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#27343a] border border-transparent rounded-lg text-slate-300 hover:bg-[#3a4d55] hover:text-white transition-all text-sm w-full justify-start group">
                                        <span className="material-symbols-outlined text-lg">description</span>
                                        <span className="truncate">Lecture Notes 10/24</span>
                                        <span className="material-symbols-outlined text-sm ml-auto opacity-0 group-hover:opacity-100">close</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-[#27343a] border border-transparent rounded-lg text-slate-300 hover:bg-[#3a4d55] hover:text-white transition-all text-sm w-full justify-start group">
                                        <span className="material-symbols-outlined text-lg">quiz</span>
                                        <span className="truncate">Quiz 2 Review</span>
                                        <span className="material-symbols-outlined text-sm ml-auto opacity-0 group-hover:opacity-100">close</span>
                                    </button>
                                </div>
                                <button className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-[#3a4d55] rounded-lg text-[#9bb1bb] hover:text-white hover:border-white transition-all text-sm mt-1">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Add Context
                                </button>
                            </div>
                        </div>
                        {/* Quick Actions */}
                        <div className="p-4 border-t border-[#27343a]">
                            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/5 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-yellow-400 text-sm">lightbulb</span>
                                    <span className="text-xs font-medium text-white">Study Tip</span>
                                </div>
                                <p className="text-xs text-[#9bb1bb] leading-relaxed">
                                    Try asking for a "Practice Problem" to test your understanding of projectile motion vectors.
                                </p>
                            </div>
                        </div>
                    </aside>
                    {/* Chat Interface (Right Panel) */}
                    <section className="flex-1 flex flex-col min-w-0 bg-[#111618] relative">
                        {/* Header */}
                        <header className="h-16 border-b border-[#27343a] flex items-center justify-between px-6 bg-[#111618]/80 backdrop-blur sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <button className="lg:hidden text-[#9bb1bb] hover:text-white">
                                    <span className="material-symbols-outlined">menu</span>
                                </button>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Unit 3: Kinematics</h3>
                                    <p className="text-[#9bb1bb] text-xs">Last synced 2m ago • 4 Context sources</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2 text-[#9bb1bb] hover:text-white hover:bg-[#27343a] rounded-lg transition-colors" title="Export Chat">
                                    <span className="material-symbols-outlined">ios_share</span>
                                </button>
                                <button className="p-2 text-[#9bb1bb] hover:text-white hover:bg-[#27343a] rounded-lg transition-colors" title="Clear History">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </header>
                        {/* Chat Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                            <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-4">
                                {/* Date Separator */}
                                <div className="flex justify-center">
                                    <span className="text-xs font-medium text-[#5a6d75] bg-[#1b2427] px-3 py-1 rounded-full">Today, 10:23 AM</span>
                                </div>
                                {/* AI Message (Welcome) */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 mt-1">
                                        <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                                    </div>
                                    <div className="flex flex-col gap-2 max-w-[85%]">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-bold text-white">ClassMind AI</span>
                                        </div>
                                        <div className="glass-panel p-5 rounded-2xl rounded-tl-none text-slate-200 text-base leading-relaxed shadow-sm">
                                            <p>Hello! I've analyzed the materials for <span className="font-bold text-white">Unit 3: Kinematics</span> from your Google Classroom. I'm ready to help you study.</p>
                                            <p className="mt-2">Would you like to start with a summary of the core concepts, or jump straight into practice problems?</p>
                                        </div>
                                    </div>
                                </div>
                                {/* User Message */}
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#27343a] border border-[#3a4d55] flex items-center justify-center mt-1">
                                        <span className="material-symbols-outlined text-[#9bb1bb] text-sm">person</span>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end max-w-[85%]">
                                        <div className="bg-primary text-chat-primary-content p-4 rounded-2xl rounded-tr-none text-base leading-relaxed shadow-lg shadow-primary/10">
                                            <p>Can you explain the difference between speed and velocity again? And maybe show me the formula for average velocity.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* AI Message (Response with Code) */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 mt-1">
                                        <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                                    </div>
                                    <div className="flex flex-col gap-2 max-w-[85%]">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-bold text-white">ClassMind AI</span>
                                        </div>
                                        <div className="glass-panel p-5 rounded-2xl rounded-tl-none text-slate-200 text-base leading-relaxed shadow-sm space-y-4">
                                            <p>Sure! The key difference lies in direction:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-1 text-slate-300">
                                                <li><strong className="text-white">Speed</strong> is a scalar quantity (magnitude only). It tells you how fast something is moving.</li>
                                                <li><strong className="text-white">Velocity</strong> is a vector quantity (magnitude + direction). It tells you how fast <em>and</em> where it's going.</li>
                                            </ul>
                                            <p>Here is the formula for average velocity, often represented in your physics code assignments like this:</p>
                                            <div className="relative group mt-3">
                                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="text-xs text-slate-400 hover:text-white bg-[#27343a] px-2 py-1 rounded flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-xs">content_copy</span> Copy
                                                    </button>
                                                </div>
                                                <pre className="bg-[#0d1112] border border-[#27343a] rounded-xl p-4 overflow-x-auto text-sm font-mono text-blue-300"><code>{`def calculate_avg_velocity(displacement, time):
    """
    Calculates average velocity.
    displacement: vector (change in position)
    time: scalar (time interval)
    """
    if time == 0:
        return None
    return displacement / time

# Example
v_avg = calculate_avg_velocity(100, 9.58)`}</code></pre>
                                            </div>
                                            <p className="text-sm text-[#9bb1bb]">Source: <span className="italic">Lecture Notes 10/24 - Slide 14</span></p>
                                        </div>
                                        {/* Reaction/Feedback actions */}
                                        <div className="flex gap-2 ml-1">
                                            <button className="p-1.5 text-[#5a6d75] hover:text-white hover:bg-[#27343a] rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-lg">thumb_up</span>
                                            </button>
                                            <button className="p-1.5 text-[#5a6d75] hover:text-white hover:bg-[#27343a] rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-lg">thumb_down</span>
                                            </button>
                                            <button className="p-1.5 text-[#5a6d75] hover:text-white hover:bg-[#27343a] rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-lg">cached</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Loading Indicator */}
                                <div className="flex gap-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]" style={{ animationDelay: '0.5s' }}>
                                </div>
                            </div>
                        </div>
                        {/* Input Area */}
                        <div className="p-6 pt-0 bg-gradient-to-t from-[#111618] via-[#111618] to-transparent">
                            <div className="max-w-3xl mx-auto">
                                {/* Suggested Prompts */}
                                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
                                    <button className="flex-shrink-0 bg-[#1b2427] hover:bg-[#27343a] border border-[#27343a] text-primary hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap">
                                        Summarize this unit
                                    </button>
                                    <button className="flex-shrink-0 bg-[#1b2427] hover:bg-[#27343a] border border-[#27343a] text-primary hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap">
                                        Explain simply
                                    </button>
                                    <button className="flex-shrink-0 bg-[#1b2427] hover:bg-[#27343a] border border-[#27343a] text-primary hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap">
                                        Generate practice quiz
                                    </button>
                                    <button className="flex-shrink-0 bg-[#1b2427] hover:bg-[#27343a] border border-[#27343a] text-primary hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap">
                                        Create flashcards
                                    </button>
                                </div>
                                {/* Input Box */}
                                <div className="relative bg-[#1b2427] border border-[#27343a] rounded-2xl shadow-2xl shadow-black/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                                    <textarea
                                        className="w-full bg-transparent text-white placeholder:text-[#5a6d75] text-base p-4 pr-12 rounded-2xl focus:outline-none resize-none min-h-[56px] max-h-32"
                                        onInput={(e) => { e.target.style.height = ''; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                        placeholder="Ask ClassMind about Unit 3..."
                                        rows="1"
                                    ></textarea>
                                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                                        <button className="p-2 text-[#9bb1bb] hover:text-primary hover:bg-[#27343a] rounded-xl transition-colors" title="Upload Image/File">
                                            <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                        </button>
                                        <button className="p-2 bg-primary text-chat-primary-content hover:bg-primary/90 rounded-xl transition-colors shadow-lg shadow-primary/20">
                                            <span className="material-symbols-outlined text-[20px] translate-x-0.5">send</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-center text-[#5a6d75] text-xs mt-3">ClassMind AI can make mistakes. Verify important information.</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
