import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import CurrencyInitializer from '@/components/shared/CurrencyInitializer';

const cairo = Cairo({
  subsets: ['latin'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Zayelle',
  description: 'Zayelle Fashion E-Commerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;500;600;700&family=Cairo:wght@400;600;700&family=DynaPuff:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${cairo.variable}`}>
        <CurrencyInitializer />
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}