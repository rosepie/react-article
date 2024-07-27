import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Select,
  Upload,
  Radio
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import breadcrumbList from '@/constant/breadcrumbList'
import { getCategoryAPI, publishArticleAPI } from '@/apis/article'

import './index.scss'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  const [options, setOptions] = useState([])
  const [items, setItems] = useState([])
  const [type, setType] = useState(1)
  const [images, setImages] = useState({})
  const [form] = Form.useForm()
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
  }, [])

  // 提交表单回调函数
  const onFinish = async (value) => {
    value.cover = {
      type: type,
      images: images.map((item) => {
        return item.response.data.url
      })
    }
    await publishArticleAPI(value)
    message.success('文章发布成功')
    //清空所有表单
    form.resetFields()
  }

  //封面类别
  const typeChange = (e) => {
    setType(e.target.value)
  }
  
  //上传文章封面
  const uploadChange = (value) => {
    setImages(value.fileList)
  }

  return (
    <div className="wrapper">
      <Breadcrumb items={items} />
      <div className="content">
        <Form
          className='article-form'
          name='article'
          form={form}
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
          onFinish={onFinish}
          initialValues={{ type: 1 }}
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
              placeholder='请选择文章类别'
              allowClear={true}
              options={options}
            />
          </Form.Item>
          <Form.Item
            label='封面'
          >
            <Form.Item name='type'>
              <Radio.Group onChange={typeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0  &&
              <Upload
                name='image'
                listType='picture-card'
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={uploadChange}
                maxCount={type}
              >
                <div style={{ marginTop: 4 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }
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