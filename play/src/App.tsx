import { lazy, Suspense } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '@/views/home/Home'
import NotFound from '@/views/notFound/NotFound'
import Layouts from '@/views/layouts/Layouts'

const VirtualLlist = lazy(() => import('@/views/virtualLlist/VirtualLlist'))
const Transition = lazy(() => import('@/views/transition/Transition'))

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layouts />,
      children: [
        {
          path: '/',
          index: true,
          element: <Home />,
        },
        {
          path: '/virtual-list',
          element: <VirtualLlist />,
        },
        {
          path: '/transition',
          element: <Transition />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback="加载中...">
        <Routes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
