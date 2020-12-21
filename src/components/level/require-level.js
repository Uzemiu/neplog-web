import store from "@/store";

export default {
  inserted(el, binding){
    const requireLevel = binding.value || 6;
    const userLevel = store.getters.user.level || 0;
    if(userLevel < requireLevel){
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
}
