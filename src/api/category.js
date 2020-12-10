import axios from "@/plugins/axios"

export function getAllCategories(){
  return axios({
    url: 'category',
    method: 'get'
  })
}
