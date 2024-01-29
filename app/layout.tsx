import Footer from '@/components/Footer/Footer';

import { ThemeProvider } from '@/components/Theme/theme-provider';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/Header/Header';
import PwaConfirm from '@/components/Pwa/PwaConfirm';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const APP_TITLE = 'SH 보증금 전환 계산기';
const APP_DESCRIPTION = '공공 전세임대주택 및 행복주택 보증금 상호전환 계산기';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.depos.kr/'),
  robots: 'index,follow',
  applicationName: APP_TITLE,
  title: {
    default: APP_TITLE,
    template: '%s | ' + APP_TITLE,
  },
  icons: {
    icon: '/app-192.png',
    apple: '/app-192.png',
    shortcut: '/app-192.png',
  },
  description: APP_DESCRIPTION,
  keywords: [
    'SH',
    '보증금',
    '전환',
    '계산기',
    '전세임대주택',
    '행복주택',
    '공공임대주택',
    '전세',
    '보증금 전환 계산기',
    '전세임대주택 보증금 전환 계산기',
    '행복주택 보증금 전환 계산기',
    '공공임대주택 보증금 전환 계산기',
    '상호전환 계산기',
    '보증금 상호전환 계산기',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: APP_TITLE,
    statusBarStyle: 'default',
    startupImage: '/app-512.png',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    siteName: APP_TITLE,
    url: 'https://www.depos.kr/',
    images: [
      {
        url: '/app-1240.png',
        width: 1240,
        height: 620,
        alt: APP_TITLE,
      },
    ],
  },
  twitter: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    card: 'summary',
    images: [
      {
        url: '/app-1240.png',
        width: 1240,
        height: 620,
        alt: APP_TITLE,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#030512',
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
        <PwaConfirm />
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-0LT6B06FR2" />
    </html>
  );
}
