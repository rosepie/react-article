// 组合 redux 子模块，并导出 store 实例

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import breadcrumbReducer from './modules/breadcrumb'

const store = configureStore({
  reducer: {
    userReducer,
    breadcrumbReducer
  }
})

export default store