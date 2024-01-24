/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  workboxOptions: {
    disableDevLogs: true, // 개발 모드에서 로그를 활성화한다.
  },
});

const nextConfig = {};

export default withPWA(nextConfig);
