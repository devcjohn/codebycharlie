import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Home.tsx'
import './index.css'
import * as Sentry from '@sentry/react'
import { FallbackComponent } from './components/FallbackComponent.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WordGame } from './WordGame.tsx'
import { About } from './About.tsx'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <App />
      </>
    ),
    errorElement: <FallbackComponent />,
  },
  {
    path: '/wordgame',
    element: (
      <>
        <Helmet>
          <title>Word Game</title>
        </Helmet>
        <WordGame />
      </>
    ),
    errorElement: <FallbackComponent />,
  },
  {
    path: '/about',
    element: (
      <>
        <Helmet>
          <title>About</title>
        </Helmet>
        <About />
      </>
    ),
    errorElement: <FallbackComponent />,
  },
])

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  beforeSend(event, hint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
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
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
)
