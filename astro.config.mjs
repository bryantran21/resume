// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  redirects: {
    '/about': '/#about',
    '/resume': '/#resume',
    '/projects': '/#projects',
  },
  vite: {
    ssr: {
      // Add these specific libraries here
      noExternal: ['react-globe.gl', 'three-globe', 'three']
    }
  }
});