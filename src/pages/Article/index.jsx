import { useEffect, useState } from 'react'
import {
  Breadcrumb
} from 'antd'
import breadcrumbList from '@/constant/breadcrumbList'

import './index.scss'

const Publish = () => {
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

  return (
    <div className="wrapper">
      <Breadcrumb items={items} />
      <div className="content">
        hi
      </div>
    </div>
  )
}

export default Publish