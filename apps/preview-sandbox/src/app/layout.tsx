import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'PMS Theme Preview',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
