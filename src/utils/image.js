export function getBase64FromFile(file){
  return new Promise((resolve => {
    const reader = new FileReader();
    reader.onloadend = e => resolve(e.target.result);
    reader.readAsDataURL(file)
  }))
}
