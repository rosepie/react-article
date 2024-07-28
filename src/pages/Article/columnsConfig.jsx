import { Tag } from 'antd'

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render: cover => {
      return cover.images.length > 0 ? <img src={cover.images[0]} width={60} height={60} /> : ''
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: data => {
      return data === 1 ? <Tag color='warning'>待审核</Tag> : <Tag color='success'>审核通过</Tag>
    }
  },
  {
    title: '发布时间',
    dataIndex: 'pubdate',
    key: 'pubdate'
  },
  {
    title: '阅读数',
    dataIndex: 'read_count',
    key: 'read_count'
  },
  {
    title: '评论数',
    dataIndex: 'comment_count',
    key: 'comment_count'
  },
  {
    title: '点赞数',
    dataIndex: 'like_count',
    key: 'like_count'
  },
  {
    title: '操作',
  }
]

export default columns