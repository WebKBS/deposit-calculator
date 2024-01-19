import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme/theme-provider';
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
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
