import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes')).sort(
    (a, b) => (b.data.publishedTime || '').localeCompare(a.data.publishedTime || '')
  );

  return rss({
    title: 'HillToken｜山外有词的更新',
    description: '山外有词，词外有山。一枚一枚捡。',
    site: context.site!,
    items: [
      {
        title: '品牌素材 Brand Kit 上线',
        description: '六种 Logo 变体、山形符号方形与横版设计稿、友链标识四版、色板与使用规范，整套可下载。',
        pubDate: new Date('2026-11-17T16:00:00+08:00'),
        link: '/brand-kit/',
      },
      ...notes.map((n) => ({
        title: n.data.title,
        description: n.data.description,
        pubDate: new Date(n.data.publishedTime),
        link: (n.data.external || `/notes/${n.id}/`) as string,
      })),
    ],
    customData: `<language>zh-CN</language>`,
  });
}
