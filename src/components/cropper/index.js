import PopCropper from "@/components/cropper/PopCropper";

const Cropper = {};

Cropper.install = function(Vue){
  const PC = Vue.extend(PopCropper);
  const cropper = new PC();
  cropper.$mount();

  Vue.prototype.$crop = function(file, done, option){
    return cropper.startCrop(file,done,option);
  }
}

export default Cropper;
