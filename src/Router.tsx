import { Helmet } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
import { About } from './About'
import App from './Home'
import { WordGame } from './WordGame'
import { FallbackComponent } from './components/FallbackComponent'
import FormFillDemo from './components/FormFillDemo'

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
