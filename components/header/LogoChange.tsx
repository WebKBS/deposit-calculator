'use client';
import LogoBlack from '@/public/logo-black.svg';
import Logo from '@/public/logo.svg';
import { useTheme } from 'next-themes';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LogoChange() {
  const { resolvedTheme } = useTheme();
  const [logo, setLogo] = useState<string>(Logo);

  console.log(logo);
  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setLogo(Logo);
    } else {
      setLogo(LogoBlack);
    }
  }, [resolvedTheme]);

  return (
    <Image
      src={logo}
      alt="보증금 임대료 계산기"
      width={40}
      height={40}
      priority
    />
  );
}
