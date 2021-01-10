import axios from "@/plugins/axios"

export function postComment(data){
  return axios({
    url: 'comment',
    method: 'post',
    data: data
  })
}

export function findByArticleId(id){
  return axios({
    url: 'comment',
    method: 'get',
    params: {id}
  })
}


