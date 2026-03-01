import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './SettingsPage.css';

const SettingsPage = () => {
    const [apiKey, setApiKey] = useState('AIzaSyD-ExampleKeyForUI-Structure');
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

    // Sliders and Parameters State
    const [chunkSize, setChunkSize] = useState(1024);
    const [topK, setTopK] = useState(5);
    const [temperature, setTemperature] = useState(0.7);

    // Toast State
    const [showToast, setShowToast] = useState(true);

    const handleSave = () => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 10); // Small timeout to trigger re-render of animation if saving repeatedly
    };

    const handleReset = () => {
        setChunkSize(1024);
        setTopK(5);
        setTemperature(0.7);
    };

    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
            <div className="flex h-full w-full">
                <Sidebar />
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Mobile Header (Visible only on small screens) */}
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark">
                        <div className="flex items-center gap-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-lg size-8" data-alt="Abstract geometric blue pattern" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBptNSAsQNXCrUVYlrzvGbT9drIzfcFjBuUv4KkEnwDRAo8zru3Q_eBdWVL50WClCvTLpn2ilQE_Ty30VSBhV50pmuQwzWC3ZjJnKXW_ZcTVLihCsSSOMb4LIJHprNlprvzsNTycVh6Gz_7ovw7hrymxF1eIVl0ygD6O-OGvGKRtIlIDSuUzJfVHWW3OvT4PQ7kcOr5iKT5-TqQfl426PrHsm89gg5d_VPuCMiPV6NEhkKFCVsWefRe44keCDmjtswzuQXehQNBL08")' }}></div>
                            <span className="font-bold text-slate-900 dark:text-white">ClassMind AI</span>
                        </div>
                        <button className="text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                    {/* Content Scroll Area */}
                    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8 lg:px-12 lg:py-10">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Header Section */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">API &amp; RAG Configuration</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg">Manage your Gemini API keys and fine-tune Retrieval-Augmented Generation parameters for optimal context awareness.</p>
                            </div>
                            {/* Main Form Grid */}
                            <div className="grid gap-6">
                                {/* Card 1: Gemini API Configuration */}
                                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 md:p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-[24px]">key</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gemini API Configuration</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block">
                                            <span className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-2 block">Gemini API Key</span>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-slate-50 dark:bg-[#111c21] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm"
                                                    placeholder="Enter your API key"
                                                    type={isApiKeyVisible ? "text" : "password"}
                                                    value={apiKey}
                                                    onChange={(e) => setApiKey(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                                                    className="absolute right-3 top-10 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer flex items-center justify-center p-1"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">{isApiKeyVisible ? "visibility_off" : "visibility"}</span>
                                                </button>
                                            </div>
                                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">info</span>
                                                Your key is encrypted at rest and never shared with third parties.
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                {/* Card 2: RAG Parameters */}
                                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 md:p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <span className="material-symbols-outlined text-[24px]">tune</span>
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">RAG Parameters</h2>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">Fine-tune how the AI retrieves and processes context.</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={handleReset} className="text-primary hover:text-primary-focus text-sm font-medium transition-colors hidden sm:block">Reset Defaults</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Chunk Size */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Chunk Size (Tokens)</label>
                                                <span className="text-primary font-mono text-sm bg-primary/10 px-2 py-0.5 rounded">{chunkSize}</span>
                                            </div>
                                            <input
                                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                                max="2048" min="128" step="128" type="range"
                                                value={chunkSize} onChange={(e) => setChunkSize(parseInt(e.target.value))}
                                            />
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>128</span>
                                                <span>2048</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-500">Determines the length of text segments retrieved from documents.</p>
                                        </div>
                                        {/* Top K */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Top K Retrieval</label>
                                                <div className="flex items-center">
                                                    <button type="button" onClick={() => setTopK(Math.max(1, topK - 1))} className="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l border-r border-slate-300 dark:border-slate-600 transition-colors text-slate-600 dark:text-slate-300">
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <input
                                                        className="w-12 h-8 text-center bg-slate-50 dark:bg-[#111c21] text-slate-900 dark:text-slate-100 text-sm border-y border-slate-300 dark:border-slate-600 focus:outline-none font-mono"
                                                        type="number" value={topK} onChange={(e) => setTopK(Math.max(1, parseInt(e.target.value) || 1))}
                                                    />
                                                    <button type="button" onClick={() => setTopK(topK + 1)} className="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r border-l border-slate-300 dark:border-slate-600 transition-colors text-slate-600 dark:text-slate-300">
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Number of relevant chunks to feed into the context window.</p>
                                        </div>
                                        {/* Temperature */}
                                        <div className="space-y-3 md:col-span-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Temperature</label>
                                                <span className="text-primary font-mono text-sm bg-primary/10 px-2 py-0.5 rounded">{temperature.toFixed(1)}</span>
                                            </div>
                                            <input
                                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                                max="1" min="0" step="0.1" type="range"
                                                value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                                            />
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>0.0 (Precise)</span>
                                                <span>1.0 (Creative)</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-500">Controls randomness. Lower values are more deterministic for factual queries.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Action Bar */}
                            <div className="flex items-center justify-end gap-4 pt-4 pb-20">
                                <button type="button" onClick={handleReset} className="px-6 py-3 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSave} className="px-8 py-3 rounded-lg bg-primary hover:text-white text-slate-900 font-bold shadow-lg shadow-primary/25 transition-all transform active:scale-95 flex items-center gap-2">
                                    <span className="material-symbols-outlined">save</span>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Toast Notification */}
                    {showToast && (
                        <div className="absolute bottom-6 right-6 md:right-10 flex items-center gap-3 bg-white dark:bg-surface-dark px-4 py-3 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700/50 animate-bounce toast-anim">
                            <div className="bg-emerald-500 rounded-full p-0.5 text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">check</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-slate-900 dark:text-white">Settings Saved</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Your configuration has been updated.</span>
                            </div>
                            <button type="button" onClick={() => setShowToast(false)} className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
