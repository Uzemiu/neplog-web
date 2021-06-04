/**
 * 用于更新Property配置
 */
import {updateProperty} from "@/api/property";

export default {
  data(){
    return {
      loading: false
    }
  },
  methods: {
    updatePropertyByKey(key, updateStore = false){
      const prop = {[key]: this.property[key]};
      return this.updatePropertyByObject(prop, updateStore);
    },
    updatePropertyByObject(prop, updateStore = false){
      this.loading = true;
      this.$emit('beforeUpdate');
      return updateProperty(prop).then(() => {
        this.$emit('afterUpdate',true);
        if(updateStore){
          this.$store.commit('setBlogConfig', prop);
        }
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
