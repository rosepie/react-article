// 高阶组件，有token 正常调整页面，无token 且页面需要token 去登录页面
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

function AuthRoute ({ children }) {
  const token = getToken()
  if(token) {
    return <>{ children }</>
  } else {
    return <Navigate to='/login' replace />
  }
}

export default AuthRoute