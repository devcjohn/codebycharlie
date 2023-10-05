/// <reference types="vite/client" />

interface ImportMetaEnv {
  /* Custom env variables */
  readonly SENTRY_DSN: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly VITE_CAPTCHA_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
