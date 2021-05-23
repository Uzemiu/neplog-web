import axios from "@/plugins/axios";

export function getProperty(keys){
  return axios({
    url: 'property',
    method: 'get',
    params: keys
  })
}

export function updateProperty(data){
  return axios({
    url: 'property',
    method: 'put',
    data: data
  })
}

export function deleteProperty(keys){
  return axios({
    url: 'property',
    method: 'delete',
    data: keys
  })
}

export function getAboutProperty(){
  return axios({
    url: 'property/about',
    method: 'get',
  })
}
