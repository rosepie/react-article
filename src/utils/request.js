// axios封装
// 1.根域名配置 2.超时时间 3.请求拦截器/响应拦截器
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

//请求拦截器：在请求发送之前 做拦截 插入一些自定义配置 重点是参数的处理
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截器：在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export { request }