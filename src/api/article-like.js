import axios from "@/plugins/axios";

export function getLike(articleId){
  return axios({
    url: 'like/article',
    method: 'get',
    params: {id: articleId}
  })
}

export function postLike(data){
  return axios({
    url: 'like/article',
    method: 'post',
    data: data
  })
}

export function deleteLike(id){
  return axios({
    url: 'like/article',
    method: 'delete',
    data: id
  })
}
