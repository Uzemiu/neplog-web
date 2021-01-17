import axios from "@/plugins/axios"

export function getPropertyByKey(key){
  return axios({
    url: 'property',
    method: 'get',
    params: {key}
  })
}

export function listAvailableCosService(){
  return getPropertyByKey('availableCosService');
}

export function getDefaultFileService(){
  return getPropertyByKey('defaultFileService');
}

export function getBlogProperty(){
  return axios({
    url: 'property/blog',
    method: 'get'
  })
}

export function getMailProperty(){
  return axios({
    url: 'property/mail',
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

export function testConnection(){
  return axios({
    url: 'property/mail/test',
    method: 'post'
  })
}
