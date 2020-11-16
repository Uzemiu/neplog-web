<template>
  <div class="content-wrapper">
    <glide :slides="slides"></glide>

    <section class="flex-section">

      <article-container></article-container>


    </section>

  </div>
</template>

<script>
import Glide from '../glide/index'
import ArticleContainer from "./ArticleContainer";

export default {
  name: "Article",
  components: {
    Glide,
    ArticleContainer
  },
  data(){
    return {
      slides: [{
        id: 123,
        img: require('@/assets/imgs/71891897_p0.jpg'),
        title: 'TIPS：本博客仅部署了前端样式'
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
}

.flex-section{
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
}

@media (max-width: 1100px) {
  .flex-section{
    width: 90%;
  }
}
@media (max-width: 768px){
  .flex-section{
    width: 100%;
  }
}
@media (max-width: 576px){

}
</style>
