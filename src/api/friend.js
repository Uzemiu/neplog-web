import axios from "@/plugins/axios"

export function listFriendView(){
  return axios({
    url: 'friend',
    method: 'get'
  })
}

export function queryFriendBy(query){
  return axios({
    url: 'friend/query',
    method: 'get',
    params: query
  })
}

export function countByLabel(){
  return axios({
    url: 'friend/count',
    method: 'get'
  })
}

export function createFriend(data){
  return axios({
    url: 'friend',
    method: 'post',
    data: data
  })
}

export function updateFriend(data){
  return axios({
    url: 'friend',
    method: 'put',
    data: data
  })
}

export function updateStatus(data){
  return axios({
    url: 'friend/status',
    method: 'put',
    data: data
  })
}

export function deleteFriend(id){
  return axios({
    url: 'friend',
    method: 'delete',
    data: id
  })
}


