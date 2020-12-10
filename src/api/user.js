import axios from "@/plugins/axios"

export function captcha(){
  return axios({
    url: 'user/captcha',
    method: 'get'
  })
}

export function register(data){
  return axios({
    url: 'user/register',
    method: 'post',
    data: data
  })
}

export function login(data){
  return axios({
    url: 'user/login',
    method: 'post',
    data: data
  })
}

export function userInfo(){
  return axios({
    url: 'user/info',
    method: 'get'
  })
}

