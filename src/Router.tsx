import { Helmet } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
import { About } from './pages/About'
import App from './pages/Home'
import { WordGame } from './pages/WordGame'
import { FallbackComponent } from './components/FallbackComponent'
import FormFillDemo from './components/FormFillDemo'
import Crash from './pages/Crash'
import { Contact } from './pages/Contact'

const routes = [
  {
    path: '/',
    title: 'Home',
    component: <App />,
  },
  {
    path: '/wordgame',
    title: 'Word Game',
    component: <WordGame />,
  },
  {
    path: '/about',
    title: 'About',
    component: <About />,
  },
  {
    path: '/formfill',
    title: 'Form Fill Demo',
    component: <FormFillDemo />,
  },
  {
    path: '/crash',
    title: 'Crash',
    component: <Crash />,
  },
  {
    path: '/contact',
    title: 'Contact',
    component: <Contact />,
  },
]

export const router = createBrowserRouter(
  routes.map(({ path, title, component }) => ({
    path,
    element: (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {component}
      </>
    ),
    errorElementLoaded: <FallbackComponent />,
  }))
)
