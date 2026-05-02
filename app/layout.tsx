import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
