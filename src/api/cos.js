import axios from "@/plugins/axios";

export function getCosProperties(){
  return axios({
    url: 'cos',
    method: 'get'
  })
}

export function updateCosProperty(name,properties){
  return axios({
    url: `cos/${name}`,
    method: 'put',
    data: properties
  })
}
