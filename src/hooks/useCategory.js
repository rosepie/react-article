// 封装获取文章类别的逻辑
import { useState, useEffect } from 'react'
import { getCategoryAPI } from '@/apis/article'

function useCategory() {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getCategoryAPI()
      const options = res.data.channels.map((item) => {
        return { value: item.name, label: item.name }
      })
      setCategoryList(options)
    }
    getCategoryList()
  }, [])

  return categoryList
}

export default useCategory