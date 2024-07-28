import { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Table,
  Button
} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import breadcrumbList from '@/constant/breadcrumbList'
import columns from './columnsConfig.jsx'
import useCategory from '@/hooks/useCategory'
import { getArticleListAPI } from '@/apis/article'

import './index.scss'

const Publish = () => {
  const options = useCategory()
  const [items, setItems] = useState([])
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
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
      const res = await getArticleListAPI()
      setCount(res.data.total_count)
      setList(res.data.results)
    }
    getList()
  }, [])

  return (
    <>
      <div className="wrapper">
        <Breadcrumb items={items} />
        <div className="content">
          <div className='filter-article'>
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              onFinish={() => { }}
              initialValues={{ status: 'all' }}
            >
              <Form.Item
                name='status'
                label='状态'
              >
                <Radio.Group>
                  <Radio value={'all'}>全部</Radio>
                  <Radio value={'draft'}>草稿</Radio>
                  <Radio value={'pass'}>审核通过</Radio>
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
                name='pubdate'
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
          <Table rowKey='id' columns={columns} dataSource={list}>

          </Table>
        </div>
      </div>
    </>
  )
}

export default Publish