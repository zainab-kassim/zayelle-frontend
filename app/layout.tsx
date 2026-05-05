import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Toaster } from 'sonner';
import Navbar from '@/components/shared/Navbar';
import './globals.css';

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
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=DynaPuff:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cairo.variable}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}