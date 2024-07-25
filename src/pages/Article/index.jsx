import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Breadcrumb
} from 'antd'
import breadcrumbList from '@/constant/breadcrumbList'
import { setBreadcrumb } from '@/store/modules/breadcrumb'

import './index.scss'

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