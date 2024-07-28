import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Table,
  Button,
  Popconfirm
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import breadcrumbList from '@/constant/breadcrumbList'
import columns from './columnsConfig.jsx'
import useCategory from '@/hooks/useCategory'
import { delArticleAPI, getArticleListAPI } from '@/apis/article'

import './index.scss'

const Publish = () => {
  const navigate = useNavigate()
  const options = useCategory()
  const [items, setItems] = useState([])
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)

  //筛选
  const [param, setParam] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 5
  })
  const onFinish = (value) => {
    console.log(value)
    setParam({
      ...param,
      status: value.status,
      channel_id: value.channel_id,
      begin_pubdate: value.date[0].format('YYYY-MM-DD'),
      end_pubdate: value.date[1].format('YYYY-MM-DD')
    })
  }

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

  //获取文章列表
  useEffect(() => {
    const getList = async () => {
      const res = await getArticleListAPI(param)
      setCount(res.data.total_count)
      setList(res.data.results)
    }
    getList()
  }, [param])

  //分页
  const onPageChange = (page) => {
    setParam({
      ...param,
      page: page
    })
  }

  //删除
  const onConfirm = async  (data) => {
    await delArticleAPI(data.id)
    setParam({
      ...param
    })
  }
  const newColumns = columns.map((item) => {
    if(item.title === '操作') {
      return {
        ...item,
        render: data => {
          return (
            <>
              <Button type='primary' shape='circle' icon={<EditOutlined />} style={{ marginRight: 5 }} onClick={() => navigate(`/publish?id=${data.id}`)}></Button>
              <Popconfirm
                title='删除文章'
                description='确认要删除当前文章吗'
                onConfirm={() => onConfirm(data)}
                okText='确认'
                cancelText='取消'
              >
                <Button type='primary' danger shape='circle' icon={<DeleteOutlined />}></Button>
              </Popconfirm>
            </>
          )
        }
      }
    } else { return item }
  })

  //编辑

  return (
    <>
      <div className="wrapper">
        <Breadcrumb items={items} />
        <div className="content">
          <div className='filter-article'>
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              onFinish={onFinish}
              initialValues={{ status: '', channel_id: '' }}
            >
              <Form.Item
                name='status'
                label='状态'
              >
                <Radio.Group>
                  <Radio value={''}>全部</Radio>
                  <Radio value={'1'}>待审核</Radio>
                  <Radio value={'2'}>审核通过</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label='分类'
                name='channel_id'
              >
                <Select
                  style={{ width: 200 }}
                  placeholder='请选择分类'
                  allowClear={true}
                  options={options}
                />
              </Form.Item>
              <Form.Item
                label='日期'
                name='date'
              >
                <DatePicker.RangePicker  
                  placeholder={['开始日期', '结束日期']}
                  locale={locale}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 2 }}>
                <Button type='primary' htmlType='submit'>筛选</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className='article-list'>
        <div className='select-title'>共查询到 {count} 条结果</div>
        <div className='select-list'>
          <Table
            rowKey='id'
            columns={newColumns}
            dataSource={list}
            pagination={{
              total: count,
              pageSize: param.per_page,
              onChange: onPageChange
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Publish