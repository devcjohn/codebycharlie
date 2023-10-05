import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import * as Sentry from '@sentry/react'
import { FallbackComponent } from './components/FallbackComponent.tsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './Router.tsx'

Sentry.init({
  environment: import.meta.env.MODE, // import.meta.env.MODE === 'development' or 'production'
  dsn: import.meta.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.1,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog (unless in development)
    if (event.exception && import.meta.env.MODE !== 'development') {
      Sentry.showReportDialog({
        eventId: event.event_id,
        user: {
          email: 'NoneOfYourBeeswax@example.com',
        },
        hint,
      })
    }
    return event
  },
})

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
