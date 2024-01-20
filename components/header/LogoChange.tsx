'use client';
import LogoBlack from '@/public/logo-black.svg';
import Logo from '@/public/logo.svg';
import { useTheme } from 'next-themes';

import Image from 'next/image';

export default function LogoChange() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={resolvedTheme === 'light' ? LogoBlack : Logo}
      alt="Logo"
      width={40}
      height={40}
      priority
    />
  );
}
