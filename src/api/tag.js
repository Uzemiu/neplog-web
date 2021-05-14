import axios from "@/plugins/axios"

export function getAllTags(){
  return axios({
    url: 'tag',
    method: 'get'
  })
}

export function updateTag(tag){
  return axios({
    url: 'tag',
    method: 'put',
    data: tag
  })
}

export function deleteTag(id){
  return axios({
    url: 'tag',
    method: 'delete',
    data: id
  })
}
