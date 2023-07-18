import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),

    // Put the Sentry vite plugin after all other plugins
    // sentryVitePlugin({
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   org: 'letitrip-zz',
    //   project: 'javascript-react',
    // }),
  ],
  test: {
    environment: 'jsdom',
  },
})
