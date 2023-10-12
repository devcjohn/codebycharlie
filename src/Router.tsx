import { Helmet } from 'react-helmet-async'
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import { WordGame } from './pages/wordGame/WordGame'
import FormFillDemo from './components/FormFillDemo'
import Crash from './pages/Crash'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { WhiteBoard } from './pages/WhiteBoard'
import { Posts } from './pages/Posts'
import { NavBar } from './components/NavBar'
import { BlogPost } from './components/BlogPost'
import { FallbackComponent } from './components/FallbackComponent'
import { WhatIKnowAboutYou } from './pages/WhatIKnowAboutYou'

const routes = [
  {
    path: '/',
    title: 'Code By Charlie',
    component: <Home />,
  },
  {
    path: '/hintle',
    title: 'Hintle',
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
    path: '/blog',
    title: 'Blogposts',
    component: <Posts />,
  },
  {
    path: '/blog/:slug',
    title: 'Post',
    component: <BlogPost />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader: async ({ params }: { params: any }) => {
      /* Having the loader here makes it easy to 404 when a post doesn't exist.
        A downside is that it seems the loader call must finish before the page starts loading */
      const res = await fetch(`/blog/${params.slug}.md`)
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
  {
    path: '/what-i-know-about-you',
    title: 'What I Know About You',
    component: <WhatIKnowAboutYou />,
  },
]

const allRoutes: RouteObject[] = routes.map(({ path, title, component, hideNavBar, loader }) => {
  return {
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
  }
})

/* Deprecated route.  Redirect to new route */
allRoutes.push({
  path: '/posts',
  element: <Navigate to="/blog" replace />,
})

/* Deprecated route.  Redirect to new route */
allRoutes.push({
  path: '/posts/1',
  element: <Navigate to="/blog/chatgpt-for-developers-10-examples" replace />,
})

export const router = createBrowserRouter(allRoutes)
