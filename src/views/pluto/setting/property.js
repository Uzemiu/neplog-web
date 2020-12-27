import {updateProperty} from "@/api/property";

export default {
  methods: {
    updateProperty(key){
      if(this.$store.getters.blogProperty[key] === this.property[key]){
        return;
      }
      this.$emit('beforeUpdate')
      const prop = {[key]:this.property[key]};
      updateProperty(prop).then(() => {
        this.$store.commit('setBlogConfig',prop)
        this.$emit('afterUpdate',true)
      }).catch(() => {
        this.$emit('afterUpdate',false)
      })
    }
  }
}
