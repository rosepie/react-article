import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  //触发 异步请求获取 token
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (value) => {
    console.log('表单：', value)
    //获取 token 并存储
    await dispatch(fetchLogin(value))
    //跳转到首页
    navigate('/')
    //提示用户登录是否成功
    message.success('登录成功~')
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* 登录表单 */}
        {/* 业务定制化： 失焦时触发校验*/}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="mobile"
            // 默认：点击登录按钮触发的校验，顺序触发
            rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[3-9]\d{9}/,
                message: '请输入正确的手机号格式'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              {
                pattern: /[0-9a-zA-Z]{6}/,
                message: '请输入正确格式的密码(6位数,数字或字母)'
              }
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login