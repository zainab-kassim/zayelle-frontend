"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

interface ErrorStateProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorState({ error, reset }: ErrorStateProps) {
  useEffect(() => {
    // client-thrown errors have no server log of their own — report to
    // Sentry so they're visible, the customer just sees the message below
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="w-full bg-paper flex items-center justify-center px-4 py-20 sm:py-24">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <p className="font-serif italic text-ink/80 font-normal text-[40px] sm:text-[52px] leading-none mb-4">
          Uh Oh
        </p>

        <h1 className="font-serif text-ink/85 font-normal text-[19px] sm:text-[22px] mb-2">
          Something Went Wrong
        </h1>
        <p className="font-sans text-muted text-[13px] leading-relaxed mb-8">
          An unexpected error occurred. Your cart and order history are safe, try again or head back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={reset}
            className="w-full sm:w-auto font-sans font-normal uppercase tracking-[0.1em] text-[11px] text-paper bg-ink rounded-full h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto font-sans font-normal uppercase tracking-[0.1em] text-[11px] text-ink border border-line rounded-full h-12 px-8 inline-flex items-center justify-center transition-colors duration-200 hover:border-ink"
          >
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="font-sans text-muted/60 text-[10px] mt-8">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
