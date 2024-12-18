import { defineConfig } from 'vite';

export default defineConfig({
  base: "/CrazyPoppers/",
  server: {
    open: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  }
});
