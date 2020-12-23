import axios from "@/plugins/axios"

export function findFriendView(){
  return axios({
    url: 'friend/view',
    method: 'get'
  })
}

export function findFriendBy(query){
  return axios({
    url: 'friend',
    method: 'get',
    params: query
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

export function deleteFriend(id){
  return axios({
    url: 'friend',
    method: 'delete',
    data: id
  })
}


