import {updateProperty} from "@/api/property";

export default {
  data(){
    return {
      loading: false
    }
  },
  methods: {
    updatePropertyByKey(key){
      if(this.$store.getters.blogProperty[key] === this.property[key]){
        return;
      }
      const prop = {[key]: this.property[key]};
      return this.updatePropertyByObject(prop).then(() => {
        if(Object.hasOwnProperty.call(this.$store.getters.blogProperty, key)){
          this.$store.commit('setBlogConfig', prop);
        }
      })
    },
    updatePropertyByObject(prop){
      this.loading = true;
      this.$emit('beforeUpdate');
      return updateProperty(prop).then(() => {
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
