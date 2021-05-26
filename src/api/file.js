import axios from "@/plugins/axios";

export function queryBy(query, location = 'default'){
  return axios({
    url: `file/${location}`,
    method: 'get',
    params: query
  })
}

export function upload(location, type, file, filename){
  return axios.post(`file/${location}/${type}`, buildParam(file,filename), config)
}

export function uploadAvatar(file, filename){
  return upload('default','avatar', file, filename)
}

export function uploadCover(file,filename){
  return upload('default','cover', file, filename)
}

export function uploadImg(file, filename){
  return upload('default','image', file, filename);
}

export function uploadFile(file, filename){
  return upload('default','file', file, filename);
}

export function deleteFile(id){
  return axios({
    url: 'file',
    method: 'delete',
    data: id
  })
}

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

function buildParam(file,filename){
  const param = new FormData();
  param.append("file", file, filename);
  return param;
}

