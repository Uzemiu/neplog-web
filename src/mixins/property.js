import {updateProperty} from "@/api/property";

export default {
  methods: {
    updatePropertyByKey(key, store){
      if(this.$store.getters.blogProperty[key] === this.property[key]){
        return;
      }
      return this.updatePropertyByObject({[key]:this.property[key]},store)
    },
    updatePropertyByObject(prop, store = true){
      this.$emit('beforeUpdate');
      return updateProperty(prop).then(() => {
        if(store){
          this.$store.commit('setBlogConfig',prop);
        }
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      })
    }
  }
}
