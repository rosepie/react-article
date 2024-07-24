// 用户信息 - 状态管理
import { createSlice } from '@reduxjs/toolkit'
import { request, setToken as _setToken, getToken, removeToken } from '@/utils'

const userStore = createSlice({
  name: 'user',
  //数据
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      removeToken()
      state.userInfo = {}
    }
  }
})

//解构出方法 actionCreator，以导出
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

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

//异步 获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }
export default userReducer