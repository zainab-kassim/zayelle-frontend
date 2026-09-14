import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import CurrencyInitializer from '@/components/shared/CurrencyInitializer';

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CurrencyInitializer />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
