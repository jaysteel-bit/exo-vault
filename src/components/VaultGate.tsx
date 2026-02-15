'use client';

import { useState } from 'react';
import { useConvex } from 'convex/react';

interface VaultGateProps {
    onUnlock: (name: string) => void;
}

export function VaultGate({ onUnlock }: VaultGateProps) {
    const convex = useConvex();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Split name
            const nameParts = formData.name.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || '';

            // Call Convex Mutation (using generic call since we don't have types in this repo)
            // "leads:submitValueLead" matches the function in EXO-HTML/convex/leads.ts
            await convex.mutation("leads:submitValueLead" as any, {
                firstName,
                lastName,
                email: formData.email,
                company: formData.company,
                source: "vault_gate"
            });

            // Unlock
            onUnlock(firstName);

        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4">
                        <img src="/logo-mark.png" alt="Exo" className="w-full h-full object-contain opacity-90" />
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-light text-white mb-2">
                        Welcome to the <span className="font-serif italic text-emerald-400">Exo Vault</span>.
                    </h1>
                    <p className="text-sm text-neutral-400">
                        Enter your details to unlock the operational scaling library.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Work Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="company" className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Company</label>
                        <input
                            type="text"
                            id="company"
                            required
                            placeholder="Exo Corp"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-400 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wide rounded-xl mt-4 transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <iconify-icon icon="svg-spinners:ring-resize" width="18"></iconify-icon>
                                <span>Unlocking...</span>
                            </>
                        ) : (
                            <>
                                <span>Access Vault</span>
                                <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-[10px] text-neutral-600 uppercase tracking-wider mt-6">
                    Secure Access • No Spam
                </p>

            </div>
        </div>
    );
}
