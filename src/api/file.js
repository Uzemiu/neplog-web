import axios from "@/plugins/axios";
import store from "@/store";

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

export function deleteFile(location, path){
  return axios({
    url: 'file/${location}',
    method: 'delete',
    data: path
  })
}
