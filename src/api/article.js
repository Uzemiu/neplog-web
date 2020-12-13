import axios from "@/plugins/axios"

export function findArticle(params){
  return axios({
    url: 'article',
    method: 'get',
    params
  })
}

export function findArticleDetail(id){
  return axios({
    url: 'article/detail',
    method: 'get',
    params: {id}
  })
}

export function findArticleView(id){
  return axios({
    url: 'article/view',
    method: 'get',
    params: {id}
  })
}

export function createArticle(){
  return axios({
    url: 'article',
    method: 'post'
  })
}

export function updateArticle(data){
  return axios({
    url: 'article',
    method: 'put',
    data: data
  })
}

