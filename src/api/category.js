import axios from "@/plugins/axios"

export function queryCategoryBy(query){
  return axios({
    url: 'category',
    method: 'get',
    params: query
  })
}

export function createCategory(data){
  return axios({
    url: 'category',
    method: 'post',
    data: data
  })
}

export function updateCategory(data){
  return axios({
    url: 'category',
    method: 'put',
    data: data
  })

}
export function deleteCategory(id){
  return axios({
    url: 'category',
    method: 'delete',
    data: id
  })
}
