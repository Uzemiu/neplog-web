<template>
  <div class="content-wrapper">
<!--    <flex-section class="home-us">-->
<!--      <h2 slot="title" class="main-title">关于</h2>-->
<!--      <p slot="intro" class="intro">-->
<!--        即使如此我依然前行 只为证明这份坚强-->
<!--      </p>-->
<!--      <features slot="items">-->
<!--        <feature>-->
<!--          <img slot="icon" src="../../assets/imgs/QQ图片20201110142312.jpg" alt="">-->
<!--          <h4 slot="title">123</h4>-->
<!--          <p slot="content">简介简介简介简介简介简介简介简介</p>-->
<!--        </feature>-->
<!--        <feature>-->
<!--          <h4 slot="title">Neplog</h4>-->
<!--          <p slot="content">欢迎来到NeptuLOGLOGLGOGLOGLOGGLOGLOG</p>-->
<!--        </feature>-->
<!--        <feature>-->
<!--          <h4 slot="title">Neplog</h4>-->
<!--          <p slot="content">欢迎来到NeptuLOGLOGLGOGLOGLOGGLOGLOG</p>-->
<!--        </feature>-->
<!--        <feature></feature>-->
<!--        <feature></feature>-->
<!--      </features>-->
<!--    </flex-section>-->

    <glide :slides="slides" class="home-slides"></glide>
    <showcase></showcase>
  </div>
</template>

<script>
// import Feature from "@/components/home/Feature";
// import Features from "@/components/home/Features";
// import FlexSection from "@/components/flex/FlexSection";
import Showcase from "@/components/showcase/Showcase";
import Glide from "@/components/glide/index"

export default {
  name: "About",
  components: {
    // Feature,
    // Features,
    // FlexSection,
    Showcase,
    Glide
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
