import axios from "@/plugins/axios";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

function buildParam(file){
  const param = new FormData();
  param.append("file", file);
  return param;
}

export function uploadCover(file){
  return axios.post("file/cover", buildParam(file), config)
}

export function uploadImg(file){
  return axios.post("file/image", buildParam(file), config);
}


export function deleteFile(path){
  return axios({
    url: 'file',
    method: 'delete',
    data: path
  })
}
