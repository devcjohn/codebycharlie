import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vitest/config'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  assetsInclude: ['/posts/*.md'] /* Let Vite know to include MD files in the build */,
  plugins: [
    react(),

    // Put the Sentry vite plugin after all other plugins
    // Sentry messes up hot reloading, so we only want to use it in production
    // Most of what we want to log with Sentry will likely happen in prod anyway
    ...(isProduction
      ? [
          sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'codebycharlie',
            project: 'code-by-charlie-project',
          }),
        ]
      : []),
  ],
  test: {
    environment: 'jsdom',
  },
})
