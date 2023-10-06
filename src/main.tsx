import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as Sentry from '@sentry/react'
import { FallbackComponent } from './components/FallbackComponent.tsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './Router.tsx'
import { initSentry } from './util/sentry.ts'

initSentry()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={
        <div>
          Sentry Fallback!
          <FallbackComponent />
        </div>
      }
      showDialog
    >
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
)
