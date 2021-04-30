import {updateConfig} from "@/api/config";

export default {
  data(){
    return {
      loading: false
    }
  },
  methods: {
    updateConfigByKey(key, configName){
      let blogConfig = this.$store.getters.blogConfig;
      if(Object.hasOwnProperty.call(blogConfig, key)
          && blogConfig[key] === this.config[key]){
        return;
      }
      const prop = {[key]: this.config[key]};
      console.log(prop)
      return this.updateConfigByObject(prop, configName).then(() => {
        if(Object.hasOwnProperty.call(blogConfig, key)){
          this.$store.commit('setBlogConfig', prop);
        }
      })
    },
    updateConfigByObject(prop, config){
      this.loading = true;
      this.$emit('beforeUpdate');
      return updateConfig(config, prop).then(() => {
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
