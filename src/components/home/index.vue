<template>
  <div class="content-wrapper">

    <glide :glide-length="slides.length" class="home-slides">
      <glide-slide
        v-for="article in slides"
        :key="article.id"
        :link="`/article/${article.id}`"
        :title="article.title"
        :img="article.img">

      </glide-slide>
    </glide>
    <showcase></showcase>
  </div>
</template>

<script>
import Showcase from "@/components/showcase/Showcase";
import Glide from "@/components/glide/index"
import GlideSlide from "@/components/glide/GlideSlide";

export default {
  name: "About",
  components: {
    Showcase,
    Glide,
    GlideSlide
  },
  data(){
    return {
      slides: [{
        id: 123,
        img: require('@/assets/imgs/71891897_p0.jpg'),
        title: 'TIPS：本博客仅部署了前端样式'
      }, {
        id: 456,
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
