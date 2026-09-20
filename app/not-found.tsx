import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-[57px] md:mt-[68px] w-full bg-paper flex items-center justify-center px-4 py-20 sm:py-28">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <p className="font-serif italic text-ink/80 font-normal text-[56px] sm:text-[72px] leading-none mb-3">
            404
          </p>

          <h1 className="font-serif text-ink/85 font-normal text-[19px] sm:text-[22px] mb-2">
            Page Not Found
          </h1>
          <p className="font-sans text-muted text-[13px] leading-relaxed mb-8">
            It appears you've strayed from the path. The page you're looking
            for doesn't exist or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto font-sans font-normal uppercase tracking-[0.1em] text-[11px] text-paper bg-ink rounded-full h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto font-sans font-normal uppercase tracking-[0.1em] text-[11px] text-ink border border-line rounded-full h-12 px-8 inline-flex items-center justify-center transition-colors duration-200 hover:border-ink"
            >
              Shop All
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
