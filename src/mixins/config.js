/**
 * 用于更新config配置
 */
import {updateConfig} from "@/api/config";

export default {
  data(){
    return {
      loading: false
    }
  },
  methods: {
    updateConfigByKey(key, configName, updateStore = false){
      const prop = {[key]: this.config[key]};
      return this.updateConfigByObject(prop, configName, updateStore);
    },
    updateConfigByObject(prop, configName, updateStore = false){
      this.loading = true;
      this.$emit('beforeUpdate');
      return updateConfig(configName, prop).then(() => {
        if(updateStore){
          this.$store.commit('setBlogConfig', prop);
        }
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
