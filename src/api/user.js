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

export function logout(){
  return axios({
    url: 'user/logout',
    method: 'post'
  })
}

export function resetPassword(data){
  return axios({
    url: 'user/resetPassword',
    method: 'post',
    data: data
  })
}

export function getUserInfo(){
  return axios({
    url: 'user/info',
    method: 'get'
  })
}

export function updateUserInfo(user){
  return axios({
    url: 'user',
    method: 'put',
    data: user
  })
}

