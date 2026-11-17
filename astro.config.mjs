import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.hilltoken.net',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
});
