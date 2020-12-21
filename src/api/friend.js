import axios from "@/plugins/axios"

export function findFriendBy(query){
  return axios({
    url: 'friend',
    method: 'get',
    params: query
  })
}
