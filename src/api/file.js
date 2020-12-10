import axios from "@/plugins/axios";

export function uploadCover(file,path){
  const param = new FormData();
  param.append("file", file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post("file/" + path, param, config)
}

export function deleteFile(path){
  return axios({
    url: 'file',
    method: 'delete',
    data: path
  })
}
