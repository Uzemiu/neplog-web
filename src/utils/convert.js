const sizeUnit = ['B','KB','MB','GB'];

export function convertFileSize(size){
  let i = 0;
  while(size >= 1024){
    size /= 1024.0;
    ++i;
  }
  return `${size.toFixed(2)} ${sizeUnit[i]}`;
}
