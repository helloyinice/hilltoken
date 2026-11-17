import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedTime: z.string(),
    order: z.string().optional(),
    external: z.string().optional(),
  }),
});

export const collections = { notes };
