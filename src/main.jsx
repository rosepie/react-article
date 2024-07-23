import React from 'react'
import ReactDOM from 'react-dom/client'
import router from '@/router'
import { RouterProvider } from 'react-router-dom'

//关联 redux 和 react, 状态管理
import { Provider } from 'react-redux'
import store from './store'

//清除默认浏览器样式
import 'normalize.css'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
