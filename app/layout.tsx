import type { Metadata } from 'next';
import '@/app/globals.css';
import { Newsreader } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';

const newsreader = Newsreader({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Readingly',
  description: 'The best book recommendation website - Enjoy doing less and reading more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          'grid grid-rows-[max-content_1fr_max-content] h-screen md:grid-rows-[max-content_1fr] md:grid-cols-[max-content_1fr]',
          newsreader.className
        )}
      >
        <Header />
        <Sidebar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
