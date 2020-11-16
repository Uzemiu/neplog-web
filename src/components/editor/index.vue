<template>
  <mavon-editor v-model="html" @save="handleChange"></mavon-editor>
</template>

<script>
import 'mavon-editor/dist/css/index.css';


export default {

  name: "index",
  components: {
  },
  data() {
    return {
      html: ''
    }
  },
  methods: {
    handleChange(value,render){
      console.log(value);
      console.log(render)
    }
  }
}
</script>

<style scoped>

</style>
