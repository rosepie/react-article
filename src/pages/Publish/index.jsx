import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import { getArticleDetail, publishArticleAPI, editArticleAPI } from '@/apis/article'
import useCategory from '@/hooks/useCategory'

import './index.scss'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  const [items, setItems] = useState([])
  const [type, setType] = useState(1)
  const [images, setImages] = useState([])
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  useEffect(() => {
    const path = location.pathname
    const items = [
      {
        title: <a href="/">首页</a>
      },
      {
        title: articleId ? breadcrumbList[path][1] : breadcrumbList[path][0]
      }
    ]
    setItems(items)
  }, [articleId])
  const options = useCategory()

  // 提交表单回调函数
  const onFinish = async (value) => {
    //校验封面数量是否符合
    if(images.length !== type) {
      message.warning('封面数量不匹配！')
      return 
    }
    value.cover = {
      type: type,
      images: images.map((item) => {
        if(item.response) {
          return item.response.data.url
        } else {
          return item.url
        }
      })
    }
    //新增
    if (!articleId) {
      await publishArticleAPI(value)
      message.success('文章发布成功')
      //清空所有表单
      form.resetFields()
    } else {
      //编辑
      await editArticleAPI({
        ...value,
        id: articleId
      })
      message.success('文章编辑成功')
    }
  }

  //封面类别
  const typeChange = (e) => {
    setType(e.target.value)
  }
  
  //上传文章封面
  const uploadChange = (value) => {
    setImages(value.fileList)
  }

  //回填数据
  useEffect(() => {
    const getDetail = async () => {
      const res = await getArticleDetail(articleId)
      const data = res.data
      setType(data.cover.type)
      form.setFieldsValue({
        ...data,
        type: data.cover.type
      })
      setImages(data.cover.images.map(item => {
        return { url: item }
      }))
    }
    articleId && getDetail()
  }, [articleId, form])

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
                fileList={images}
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