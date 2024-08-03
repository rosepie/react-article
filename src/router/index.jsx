import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'

import AuthRoute from '@/components/AuthRoute'

//打包路由懒加载，react提供的 lazy 函数，配合 react 内置的 Suspense 组件
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={'加载中'}><AuthRoute><Layout /></AuthRoute></Suspense>,
    children: [
      {
        index: true,
        element: <Suspense fallback = { '加载中' }><Home /></Suspense>
      },
      {
        path: 'article',
        element: <Suspense fallback={'加载中'}><Article /></Suspense>
      },
      {
        path: 'publish',
        element: <Suspense fallback={'加载中'}><Publish /></Suspense>
      }
    ]
  },
  {
    path: '/login',
    element: <Suspense fallback={'加载中'}><Login /></Suspense>
  }
])

export default router