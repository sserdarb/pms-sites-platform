import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'PMS Sites — Dashboard',
  description: 'Otel sitesi kurulum sihirbazı',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
