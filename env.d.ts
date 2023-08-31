/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SENTRY_DSN: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly VITE_CAPTCHA_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
