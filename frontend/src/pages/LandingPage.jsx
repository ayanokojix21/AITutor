import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, []);

    return (
        <>

            <div className="relative flex min-h-screen w-full flex-col">
                <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-[24px]">school</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">ClassMind AI</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium text-slate-300 transition-colors hover:text-white" href="#">Features</a>
                            <a className="text-sm font-medium text-slate-300 transition-colors hover:text-white" href="#">How it Works</a>
                            <a className="text-sm font-medium text-slate-300 transition-colors hover:text-white" href="#">Pricing</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Link className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white md:block" to="/auth/login">Sign In</Link>
                            <Link to="/auth/login" className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="flex-grow">
                    <section className="relative pt-20 pb-32 overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-glow-gradient pointer-events-none opacity-60"></div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                New: Quiz Generation 2.0
                            </div>
                            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl mb-6">
                                Learn Smarter with <br className="hidden md:block" />
                                <span className="text-gradient">Your Classroom AI</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
                                Your context-aware learning assistant that integrates seamlessly with Google Classroom. Transform your study materials into interactive conversations.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-20">
                                <Link to="/auth/login" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white text-background-dark px-6 py-3.5 text-base font-bold shadow-lg shadow-white/10 hover:bg-slate-200 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                    Login with Google
                                </Link>
                                <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                    View Demo
                                </button>
                            </div>
                            <div className="relative mx-auto max-w-6xl">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl opacity-40"></div>
                                <div className="relative rounded-2xl border border-white/10 bg-[#0A0E17] shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/8] flex flex-col group">
                                    <div className="reflection-sheen"></div>
                                    <div className="h-14 border-b border-white/5 bg-[#0F1623] flex items-center justify-between px-6 shrink-0 z-20">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-2">
                                                <div className="size-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                                <div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                                                <div className="size-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                            </div>
                                            <div className="h-4 w-px bg-white/10 mx-2"></div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">folder_open</span>
                                                <span>Study Session: DBMS Midterms</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-500 font-mono px-2 py-1 bg-white/5 rounded">v2.4.0</span>
                                            <div className="size-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">US</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 overflow-hidden relative z-10">
                                        <div className="w-64 border-r border-white/5 bg-[#0A0E17] hidden md:flex flex-col p-4">
                                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Active Context</h3>
                                            <div className="space-y-2 mb-6">
                                                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3 group/chip cursor-pointer hover:bg-primary/15 transition-colors">
                                                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">description</span>
                                                    <div>
                                                        <p className="text-sm text-slate-200 font-medium">DBMS Unit 1.pdf</p>
                                                        <p className="text-xs text-slate-500">24 pages • Uploaded 2h ago</p>
                                                    </div>
                                                </div>
                                                <div className="p-3 rounded-lg bg-surface-dark border border-white/5 flex items-start gap-3 group/chip cursor-pointer hover:bg-white/5 transition-colors">
                                                    <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5">slideshow</span>
                                                    <div>
                                                        <p className="text-sm text-slate-300 font-medium">Lecture 4 - SQL Basics</p>
                                                        <p className="text-xs text-slate-500">12 slides • Google Drive</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Quick Actions</h3>
                                            <div className="space-y-1">
                                                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-400 text-sm flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px]">quiz</span> Generate Quiz
                                                </button>
                                                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-400 text-sm flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px]">flash_on</span> Create Flashcards
                                                </button>
                                                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 text-slate-400 text-sm flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px]">summarize</span> Summarize All
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col bg-[#05070F] relative">
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                                            <div className="flex-1 overflow-y-auto p-6 space-y-8 chat-scroll">
                                                <div className="flex justify-end">
                                                    <div className="message-bubble-user max-w-xl rounded-2xl rounded-tr-sm p-4 text-sm text-slate-200 shadow-lg">
                                                        <p>Can you explain the difference between a Primary Key and a Foreign Key based on the Unit 1 PDF? Also, show me an SQL example.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4 max-w-3xl">
                                                    <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                                                        <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="message-bubble-ai rounded-2xl rounded-tl-sm p-6 text-sm text-slate-300">
                                                            <p className="mb-4">Based on <span className="text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded text-xs cursor-pointer border border-primary/20">DBMS Unit 1.pdf (p. 14)</span>, here is the breakdown:</p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                                                    <strong className="text-white block mb-1">Primary Key (PK)</strong>
                                                                    Uniquely identifies each record in a table. It cannot contain NULL values.
                                                                </div>
                                                                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                                                                    <strong className="text-white block mb-1">Foreign Key (FK)</strong>
                                                                    A field that links to the Primary Key of another table. It enforces referential integrity.
                                                                </div>
                                                            </div>
                                                            <p className="mb-3">Here is the SQL example you requested:</p>
                                                            <div className="code-block rounded-lg overflow-hidden text-xs my-2 shadow-xl">
                                                                <div className="bg-[#161b22] px-4 py-2 border-b border-white/5 flex justify-between items-center">
                                                                    <span className="text-slate-500">schema.sql</span>
                                                                    <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-[14px]">content_copy</span></button>
                                                                </div>
                                                                <div className="p-4 overflow-x-auto text-slate-300">
                                                                    <pre><code><span className="text-pink-400">CREATE TABLE</span> Students (
                                                                        student_id <span className="text-orange-400">INT PRIMARY KEY</span>,
                                                                        name <span className="text-orange-400">VARCHAR</span>(100)
                                                                        );
                                                                        <span className="text-pink-400">CREATE TABLE</span> Enrollments (
                                                                        enrollment_id <span className="text-orange-400">INT PRIMARY KEY</span>,
                                                                        student_id <span className="text-orange-400">INT</span>,
                                                                        course_name <span className="text-orange-400">VARCHAR</span>(100),
                                                                        <span className="text-pink-400">FOREIGN KEY</span> (student_id) <span className="text-pink-400">REFERENCES</span> Students(student_id)
                                                                        );</code></pre>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:bg-white/10 transition-colors">What happens if I delete a student?</button>
                                                            <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 hover:bg-white/10 transition-colors">Generate 5 quiz questions on this</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 border-t border-white/5 bg-[#0F1623]">
                                                <div className="relative rounded-xl bg-[#1E293B]/50 border border-white/10 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                                                    <input className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 py-3 pl-4 pr-12 focus:ring-0" placeholder="Ask a follow-up question..." type="text" />
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                        <button className="p-1.5 text-slate-400 hover:text-white transition-colors rounded hover:bg-white/10">
                                                            <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                                        </button>
                                                        <button className="p-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-lg shadow-primary/20">
                                                            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-2">
                                                    <p className="text-[10px] text-slate-600">ClassMind AI can make mistakes. Verify important info.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-24 relative bg-background-dark">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How ClassMind Works</h2>
                                <p className="mt-4 text-lg text-slate-400">Transforming your classroom data into knowledge in three simple steps.</p>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 border-t border-dashed border-primary/30 z-0"></div>
                                <div className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-dark border border-white/5 shadow-xl mb-6 transition-transform group-hover:-translate-y-2 duration-300">
                                        <span className="material-symbols-outlined text-[40px] text-primary">cloud_sync</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Connect Classroom</h3>
                                    <p className="text-slate-400 leading-relaxed">One-click integration securely syncs your Google Classroom documents and assignments.</p>
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-dark border border-white/5 shadow-xl mb-6 transition-transform group-hover:-translate-y-2 duration-300">
                                        <span className="material-symbols-outlined text-[40px] text-secondary">psychology</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">AI Analyzes Content</h3>
                                    <p className="text-slate-400 leading-relaxed">Our RAG engine processes your materials to understand context, context, and key concepts.</p>
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-dark border border-white/5 shadow-xl mb-6 transition-transform group-hover:-translate-y-2 duration-300">
                                        <span className="material-symbols-outlined text-[40px] text-pink-500">quiz</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Start Learning</h3>
                                    <p className="text-slate-400 leading-relaxed">Ask complex questions, generate instant quizzes, and get summaries tailored to you.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-24 bg-surface-dark/30 border-y border-white/5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                                        Powerful Features for <br />
                                        <span className="text-primary">Modern Students</span>
                                    </h2>
                                    <p className="text-lg text-slate-400 mb-8">
                                        ClassMind isn't just a chatbot. It's a comprehensive study companion that understands your specific curriculum.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-green-400 mt-0.5">check_circle</span>
                                            <span className="text-slate-300">Instant answers from your specific class materials</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-green-400 mt-0.5">check_circle</span>
                                            <span className="text-slate-300">Auto-generated flashcards from lecture notes</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-green-400 mt-0.5">check_circle</span>
                                            <span className="text-slate-300">Secure and private data handling</span>
                                        </li>
                                    </ul>
                                    <a className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors" href="#">
                                        Explore all features <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                                    </a>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">forum</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Subject-wise AI Chat</h3>
                                        <p className="text-sm text-slate-400">Chat directly with your History, Math, or Science notes independently without confusion.</p>
                                    </div>
                                    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="h-10 w-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">psychology_alt</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Context-aware Answers</h3>
                                        <p className="text-sm text-slate-400">The AI knows exactly which PDF or slide deck to reference when answering your questions.</p>
                                    </div>
                                    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="h-10 w-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">summarize</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Smart Summaries</h3>
                                        <p className="text-sm text-slate-400">Get concise bullet-point summaries of long readings or lecture transcripts instantly.</p>
                                    </div>
                                    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">school</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Quiz Generation</h3>
                                        <p className="text-sm text-slate-400">Test your knowledge with AI-generated multiple choice questions based on your curriculum.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-20">
                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-primary/20 to-surface-dark border border-white/10 px-6 py-16 text-center sm:px-16 lg:py-20">
                                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl"></div>
                                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"></div>
                                <h2 className="relative z-10 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Ready to upgrade your study habits?
                                </h2>
                                <p className="relative z-10 mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                                    Join thousands of students using ClassMind to study less and learn more.
                                </p>
                                <div className="relative z-10 mt-8 flex justify-center gap-4">
                                    <Link to="/dashboard" className="rounded-xl bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all">
                                        Get Started for Free
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="border-t border-white/5 bg-background-dark py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="flex size-6 items-center justify-center rounded bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-[16px]">school</span>
                            </div>
                            <span className="text-md font-bold text-white">ClassMind AI</span>
                        </div>


                    </div>
                </footer>
            </div>


        </>
    );
};

export default LandingPage;
