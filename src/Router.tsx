import { Helmet } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
//import { WordGame } from './pages/wordGame/WordGame'
import FormFillDemo from './components/FormFillDemo'
//import Crash from './pages/Crash'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
//import { Posts } from './pages/Posts'
import { NavBar } from './components/NavBar'
import { FallbackComponent } from './components/FallbackComponent'
import { lazy } from 'react'

const WhiteBoard = lazy(() =>
  import('./pages/WhiteBoard').then((module) => ({ default: module.WhiteBoard }))
)
const BlogPost = lazy(() =>
  import('./components/BlogPost').then((module) => ({ default: module.BlogPost }))
)

const Posts = lazy(() => import('./pages/Posts').then((module) => ({ default: module.Posts })))

const WordGame = lazy(() =>
  import('./pages/wordGame/WordGame').then((module) => ({ default: module.WordGame }))
)

const Crash = lazy(() => import('./pages/Crash').then((module) => ({ default: module.Crash })))

const routes = [
  {
    path: '/',
    title: 'Code By Charlie',
    component: <Home />,
  },
  {
    path: '/wordgame',
    title: 'Word Game',
    component: <WordGame />,
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
    hideNavBar: true,
  },
  {
    path: '/posts',
    title: 'Posts',
    component: <Posts />,
  },
  {
    path: '/posts/:postId',
    title: 'Post',
    component: <BlogPost />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader: async ({ params }: { params: any }) => {
      /* Having the loader here makes it easy to 404 when a post doesn't exist.
        A downside is that it seems the loader call must finish before the page starts loading */
      const res = await fetch(`/posts/post${params.postId}.md`)
      if (res.status === 404) {
        throw new Response('Not Found', { status: 404 })
      }
      return res.text()
    },
  },
  {
    path: '/404',
    title: '404',
    component: <FallbackComponent />,
  },
]

export const router = createBrowserRouter(
  routes.map(({ path, title, component, hideNavBar, loader }) => ({
    path,
    element: (
      <>
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="description" content="Code By Charlie" />
          <meta name="author" content="Charlie Johnson" />
          <meta
            name="keywords"
            content="Programming, Coding, Software Development, Charlie Johnson, Code By Charlie"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:locale" content="en_US" />
        </Helmet>
        {!hideNavBar && <NavBar />}
        {component}
      </>
    ),
    errorElement: <FallbackComponent />,
    loader: loader,
  }))
)
