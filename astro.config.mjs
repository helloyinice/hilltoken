import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hilltoken.net',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
});
