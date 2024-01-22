import Footer from '@/components/Footer';
import Header from '@/components/header/Header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SH 보증금 전환 계산기 ',
  description: '공공 전세임대주택 및 행복주택 보증금 전환 계산기',
  keywords:
    'SH, 보증금, 전환, 계산기, 전세임대주택, 행복주택, 공공임대주택, 전세, 보증금전환계산기, 전세임대주택보증금전환계산기, 행복주택보증금전환계산기, 공공임대주택보증금전환계산기',
};

export const viewport = {
  with: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-[100%]">
            <Header />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
