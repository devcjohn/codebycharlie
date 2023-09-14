import { Helmet } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
import { About } from './pages/About'
import { WordGame } from './pages/wordGame/WordGame'
import { FallbackComponent } from './components/FallbackComponent'
import FormFillDemo from './components/FormFillDemo'
import Crash from './pages/Crash'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { WhiteBoard } from './pages/WhiteBoard'

const routes = [
  {
    path: '/',
    title: 'Home',
    component: <Home />,
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
  {
    path: '/whiteboard',
    title: 'whiteboard',
    component: <WhiteBoard />,
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
