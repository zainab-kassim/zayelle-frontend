"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting || !email) return;

        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("You're on the list. Welcome to the circle.");
            setEmail("");
            setIsSubmitting(false);
        }, 500);
    }

    return (
        <section className="relative w-full overflow-hidden rounded-3xl bg-ink px-6 sm:px-10 py-12 sm:py-16 flex flex-col items-center text-center">
            {/* Soft warm glow — echoes the gradient treatment on Hero/Banner instead of a flat block */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255,244,230,0.10) 0%, transparent 65%)",
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <span className="font-sans text-paper/60 tracking-[0.2em] uppercase text-[10px] sm:text-[11px] font-medium mb-2.5">
                    Zayelle Circle
                </span>
                <h2 className="font-serif text-paper font-normal leading-[1.18] text-[18px] sm:text-[25px] md:text-[28px] mb-2.5 max-w-lg">
                    Be first to the <span className="italic">new season</span>
                </h2>
                <p className="font-sans text-paper/65 text-[12px] sm:text-[13px] max-w-sm mb-7 leading-relaxed">
                    Early access to new collections, custom-order slots and styling notes, straight to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="flex-1 font-sans text-[13px] text-paper placeholder:text-paper/40 bg-transparent border border-paper/25 rounded-full px-5 py-3.5 outline-none transition-colors duration-200 focus:border-paper/60"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="font-sans font-medium uppercase tracking-[0.1em] text-[11px] sm:text-[12px] text-ink bg-paper rounded-full px-7 py-3.5 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                    >
                        {isSubmitting ? "Joining…" : "Subscribe"}
                    </button>
                </form>
            </div>
        </section>
    );
}
