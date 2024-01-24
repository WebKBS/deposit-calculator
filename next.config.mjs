/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: false, // PWA 비활성화 여부
});

const nextConfig = {};

export default withPWA(nextConfig);
