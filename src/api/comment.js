import axios from "@/plugins/axios"

export function queryArticleCommentBy(query){
  return axios({
    url: 'comment',
    method: 'get',
    params: query
  })
}

export function queryArticleCommentWithArticleBy(query){
  return axios({
    url: 'comment/query',
    method: 'get',
    params: query
  })
}

export function createArticleComment(data){
  return axios({
    url: 'comment',
    method: 'post',
    data: data
  })
}

export function updateArticleComment(data){
  return axios({
    url: 'comment',
    method: 'put',
    data: data
  })
}

export function deleteArticleComment(data){
  return axios({
    url: 'comment',
    method: 'delete',
    data: data
  })
}



