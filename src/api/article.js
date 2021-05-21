import axios from "@/plugins/axios"

export function queryArticleBy(query){
  return axios({
    url: 'article/query',
    method: 'get',
    params: query
  })
}

export function countArticleByLabel(){
  return axios({
    url: 'article/count',
    method: 'get'
  })
}

export function listArticleDetail(id){
  return axios({
    url: 'article/detail',
    method: 'get',
    params: {id}
  })
}

export function listArticleView(id){
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

export function updateCategory({id, category}){
  return axios({
    url: 'article/category',
    method: 'put',
    data: {
      id,category
    }
  })
}

export function deleteById(id){
  return axios({
    url: 'article',
    method: 'delete',
    data: id
  })
}

export default {
  queryArticleBy,
  listArticleDetail,
  listArticleView,
  createArticle,
  updateArticle,
  updateDeleted
};

