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
            toast.success("You're on the list — welcome to the circle.");
            setEmail("");
            setIsSubmitting(false);
        }, 500);
    }

    return (
        <section className="w-full rounded-3xl bg-ink px-6 sm:px-10 py-14 sm:py-20 flex flex-col items-center text-center">
            <span className="font-sans text-white/60 tracking-[0.22em] uppercase text-[11px] sm:text-[12px] font-medium mb-3">
                Zayelle Circle
            </span>
            <h2 className="font-serif text-white font-medium leading-tight text-[26px] sm:text-[34px] md:text-[40px] mb-3 max-w-lg">
                Be first to the <span className="italic">new season</span>
            </h2>
            <p className="font-sans text-white/65 text-[13px] sm:text-[14px] max-w-sm mb-8 leading-relaxed">
                Early access to new collections, custom-order slots and styling notes — straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 font-sans text-[13px] text-white placeholder:text-white/40 bg-transparent border border-white/25 rounded-full px-5 py-3.5 outline-none transition-colors duration-200 focus:border-white/60"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans font-semibold uppercase tracking-[0.14em] text-[11px] sm:text-[12px] text-ink bg-white rounded-full px-7 py-3.5 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                >
                    {isSubmitting ? "Joining…" : "Subscribe"}
                </button>
            </form>
        </section>
    );
}
