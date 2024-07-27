import { request } from '@/utils'

export function getCategoryAPI() {
  return request({
    url: '/channels',
    method: 'GET'
  })
}