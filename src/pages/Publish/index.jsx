import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select
} from 'antd'
import breadcrumbList from '@/constant/breadcrumbList'
import { setBreadcrumb } from '@/store/modules/breadcrumb'

import './index.scss'

const {TextArea} = Input

const Publish = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const path = location.pathname
    const items = [
      {
        title: <a href="/">首页</a>
      },
      {
        title: breadcrumbList[path]
      }
    ]
    dispatch(setBreadcrumb(items))
  }, [dispatch])
  const items = useSelector(state => state.breadcrumbReducer.breadcrumb)

  //文章分类
  const options = [{
    value: 'jack',
    label: 'Jack',
  },
    {
      value: 'lucy',
      label: 'Lucy',
    }]

  return (
    <div className="wrapper">
      <Breadcrumb items={items} />
      <div className="content">
        <Form
          className='article-form'
          name='article'
          labelCol={8}
          wrapperCol={16}
          onFinish={() => {}}
        >
          <Form.Item
            label='标题'
            name='title'
            rules={[
              {
                required: true,
                message: '请输入文章标题'
              }
            ]}
          >
            <Input placeholder='请输入文章标题' />
          </Form.Item>
          <Form.Item
            label='分类'
            name='channel_id'
            rules={[
              {
                required: true,
                message: '请选择文章类别'
              }
            ]}
          >
            <Select
              mode='multiple'
              placeholder='请选择文章类别'
              onChange={() => {}}
              options={options}
            />
          </Form.Item>
          <Form.Item
            label='内容'
            name='content'
            rules={[
              {
                required: true,
                message: '请输入文章内容'
              }
            ]}
          >
            <TextArea
              showcount
              placeholder='请输入文章内容...'
              onChange={() => {}}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10}}>
            <Button size='large' type='primary' htmlType='submit'>发布文章</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Publish