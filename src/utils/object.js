// 浅拷贝
export function copyProperties(source,target){
  for(let key of Object.keys(source)){
    target[key] = source[key];
  }
}
