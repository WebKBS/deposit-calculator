'use client';

import NotFoundLottieJson from '@/assets/lottie/not-found.json';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export default function NotFoundLottie() {
  return (
    <div className="max-w-96 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다. 🥲</h2>
      <Lottie animationData={NotFoundLottieJson} loop={true}></Lottie>
      <Link href="/" className={buttonVariants({ variant: 'default' })}>
        홈으로 되돌아가기
      </Link>
    </div>
  );
}
