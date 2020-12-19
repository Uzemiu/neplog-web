import axios from "@/plugins/axios"

export function installed(){
  return axios({
    url: 'property/installed',
    method: 'get'
  })
}

export function install(data){
  return axios({
    url: 'property/install',
    method: 'post',
    data: data
  })
}

export function getBlogProperty(){
  return axios({
    url: 'property/blog',
    method: 'get'
  })
}

export function resetProperty(){
  return axios({
    url: 'property/reset',
    method: 'post'
  })
}

export function updateProperty(data){
  return axios({
    url: 'property',
    method: 'put',
    data: data
  })
}

