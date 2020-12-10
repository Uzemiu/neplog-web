import axios from "@/plugins/axios"

export function getAllTags(){
  return axios({
    url: 'tag',
    method: 'get'
  })
}
