<template>
  <div class="content-wrapper">

    <glide :glides="glides" class="home-slides"></glide>
    <showcase></showcase>
  </div>
</template>

<script>
import Showcase from "@/components/showcase/Showcase";
import Glide from "@/components/glide/index"

export default {
  name: "About",
  components: {
    Showcase,
    Glide
  },
  data(){
    return {
      glides: [{
        id: 123,
        link: `/article/${this.id}`,
        img: require('@/assets/imgs/71891897_p0.jpg'),
        title: 'TIPS：本博客仅部署了前端样式'
      }, {
        id: 456,
        link: `/article/${this.id}`,
        img: require('@/assets/imgs/71773962_p0.jpg'),
        title: 'EXTER'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #fafafa;

  .about-us{
    padding-bottom: 32px;
  }

  .home-slides{
    //margin-top: 47px;
  }
}

</style>
