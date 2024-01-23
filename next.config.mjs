/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true, // 사용자가 페이지를 이동할 때 캐시를 사용할지 여부를 결정한다.
  aggressiveFrontEndNavCaching: true, // <link rel="stylesheet"> 및 <script> 태그를 캐시한다.
  reloadOnOnline: true, // 앱이 온라인 상태로 전환될 때 새로고침한다.
  disable: false, // PWA 비활성화 여부
});

const nextConfig = {};

export default withPWA(nextConfig);
