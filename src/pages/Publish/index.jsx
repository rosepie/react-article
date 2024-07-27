import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select
} from 'antd'
import ReactQuill from 'react-quill'
import breadcrumbList from '@/constant/breadcrumbList'
import { getCategoryAPI } from '@/apis/article'

import './index.scss'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  const [options, setOptions] = useState([])
  const [items, setItems] = useState([])
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
    setItems(items)
  }, [])

  useEffect(() => {
    const getCategory = async () => {
      const res = await getCategoryAPI()
      const options = res.data.channels.map((item) => {
        return {value: item.name, label: item.name}
      })
      setOptions(options)
    }
    getCategory()
  })

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
              allowClear={true}
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
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='请输入文章内容'
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2}}>
            <Button size='large' type='primary' htmlType='submit'>发布文章</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Publish