import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://depos.kr', // 사용자가 접근할 수 있는 URL
      lastModified: new Date(), // 마지막으로 수정된 날짜
      changeFrequency: 'monthly', // 변경 빈도
      priority: 1, // 우선순위
    },
  ];
}
