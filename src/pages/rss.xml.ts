import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes')).sort(
    (a, b) => (b.data.publishedTime || '').localeCompare(a.data.publishedTime || '')
  );

  return rss({
    title: 'HillToken｜山外有词的更新',
    description: '山外有词，词外有山。由站主本人维护的个人网站与更新记录。',
    site: context.site!,
    items: [
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
