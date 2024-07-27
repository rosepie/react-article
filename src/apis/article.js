import { request } from '@/utils'

export function getCategoryAPI() {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export function publishArticleAPI(value) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data: value
  })
}