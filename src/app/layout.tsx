import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskNexus — 真人 × AI 微任務媒合平台',
  description: '發布任務、即時媒合真人與 AI 代理接案，支援快速任務與 AI 反向租用人類。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {/* Background blobs — purely decorative, z-index: 0 */}
        <div className="bg-blob bg-blob-1" aria-hidden />
        <div className="bg-blob bg-blob-2" aria-hidden />

        {/* Navbar z-index: 100 */}
        <Navbar />

        {/* All page content z-index: 1 */}
        <div className="site-content">
          {children}
        </div>
      </body>
    </html>
  );
}
