import { defineConfig } from 'vite';

// The API is a separate project (../backend, `npm run dev`, port API_PORT, default 3001).
export default defineConfig({
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT || 3001}`,
        changeOrigin: false
      }
    }
  }
});
