import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vitest/config'
import path from 'path'
const isProduction = process.env.NODE_ENV === 'production'

import type { Plugin } from 'vite'

/* Check that required environment variables are set */
const envVarValidationPlugin = (): Plugin => {
  return {
    name: 'env-validation',
    configResolved(config) {
      const requiredEnvVars = ['VITE_SENTRY_DSN', 'VITE_SENTRY_AUTH_TOKEN', 'VITE_CAPTCHA_KEY']
      const errorList: string[] = []
      requiredEnvVars.forEach((varName) => {
        if (!config.env[varName]) {
          errorList.push(varName)
        }
      })
      if (errorList.length > 0) {
        throw new Error(
          `Error: Missing the following required environment variables:\n${errorList.join('\n')}`
        )
      }
    },
  }
}

export default defineConfig({
  build: {
    sourcemap: true,
  },
  assetsInclude: ['/posts/*.md'] /* Let Vite know to include MD files in the build */,
  plugins: [
    react(),
    envVarValidationPlugin(),
    // Put the Sentry vite plugin after all other plugins
    // Sentry messes up hot reloading, so we only want to use it in production
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
