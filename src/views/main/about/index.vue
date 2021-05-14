<template>
  <div class="about">
    <glide></glide>
    <div class="about-info">

    </div>
  </div>
</template>

<script>
import Glide from "@/components/glide/index";
export default {
  name: "About",
  components: {Glide},
  data(){
    return{
      glide:[{
        img: this.$store.getters.blogConfig.friendPageCover,
        title: '关于'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.about{

}
</style>
