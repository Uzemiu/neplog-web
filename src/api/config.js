import axios from "@/plugins/axios"

export function installed(){
  return axios({
    url: 'config/installed',
    method: 'get'
  })
}

export function install(data){
  return axios({
    url: 'config/install',
    method: 'post',
    data: data
  })
}

export function getBlogConfig(){
  return axios({
    url: 'config/blog',
    method: 'get'
  })
}
