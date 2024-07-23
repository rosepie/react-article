// 用户信息 - 状态管理

import { request } from '@/utils'
import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
  name: 'user',
  //数据
  initialState: {
    token: getToken() || ''
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    }
  }
})

//解构出方法 actionCreator，以导出
const { setToken } = userStore.actions

//获取 reducer 函数，以导出
const userReducer = userStore.reducer

//异步 登录获取 token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //使用封装好的 axios 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    //dispatch 调用同步修改方法
    dispatch(setToken(res.data.token))
  }
}

export { setToken, fetchLogin }
export default userReducer