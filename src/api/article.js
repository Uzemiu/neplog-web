import axios from "@/plugins/axios"

export function queryBy(query){
  return axios({
    url: 'article/list',
    method: 'get',
    params: query
  })
}

export function privateQueryBy(query){
  return axios({
    url: 'article/query',
    method: 'get',
    params: query
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

export function updateDeleted({id, deleted}){
  return axios({
    url: 'article/delete',
    method: 'put',
    data: {
      id,deleted
    }
  })
}

export default {findArticle: queryBy,findArticleDetail,findArticleView,createArticle,updateArticle,updateDeleted};

