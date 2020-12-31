import axios from "@/plugins/axios";

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

function buildParam(file,filename){
  console.log(filename)
  const param = new FormData();
  param.append("file", file, filename);
  return param;
}

export function upload(type, file, filename){
  return axios.post("file/" + type, buildParam(file,filename), config)
}

export function uploadAvatar(file, filename){
  return upload('avatar', file, filename)
}

export function uploadCover(file,filename){
  return upload("cover", file,filename)
}

export function uploadImg(file){
  return upload("image", file);
}

export function deleteFile(path){
  return axios({
    url: 'file',
    method: 'delete',
    data: path
  })
}
