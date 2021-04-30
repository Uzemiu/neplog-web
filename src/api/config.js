import axios from "@/plugins/axios"

export function getBlogConfigVO(){
  return axios({
    url: 'config/blog',
    method: 'get'
  })
}

export function getConfig(config){
  return axios({
    url: `config/pluto/${config}`,
    method: 'get'
  })
}

export function updateConfig(config, data){
  return axios({
    url: `config/pluto/${config}`,
    method: 'put',
    data: data
  })
}

export function resetConfig(config){
  return axios({
    url: `config/pluto/${config}`,
    method: 'delete'
  })
}

export function testConnection(){
  return axios({
    url: 'config/mail/test',
    method: 'post'
  })
}
