<template>
  <div class="content-wrapper">
    <glide
        :glides="glides"
        v-scroll-reveal.reset
        ref="glide">
    </glide>
    <responsive class="article-list-container">
      <article-list
        :articles="articles"
        :show-arrow="true"
        mode="show"></article-list>
      <p class="no-more" v-if="articles.length===0">好像还没有发过一篇博客呢...</p>
    </responsive>
  </div>
</template>

<script>
import Responsive from "../../../components/layout/Responsive";
import Glide from "../../../components/glide/index"
import {queryArticleBy} from "@/api/article";
import {fromArticle} from "@/utils/glide";
import ArticleList from "@/components/article/ArticleList";
import GlideConfig from "@/config/glide";

export default {
  name: "Home",
  components: {
    ArticleList,
    Responsive,
    Glide
  },
  data(){
    return {
      glides: [],
      articles: []
    }
  },
  mounted() {
    let cover = this.$store.getters.blogConfig.glide_image_home || GlideConfig.glide_image_home;
    if(!Number.parseInt(cover)){
      this.glides.push({
        img:cover,
        title: this.$store.getters.blogConfig.glide_title_home
      })
    }
    queryArticleBy({
      status: 4,
      deleted: false,
      viewPermission: 0,
      sort: 'createTime,desc'
    }).then(articles => {
      articles = articles.content;
      this.articles = articles;
      if(this.glides.length === 0){
        this.glides = fromArticle(...(articles.slice(0, Number.parseInt(cover))));
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media (min-width: 769px) {
  .content-wrapper{
    ::v-deep .article-item:nth-child(2n) .article-card{
        grid-template-areas: "content cover";
        grid-template-columns: 1fr 360px;
    }
  }
}

@media (max-width: 576px) {
  .article-list-container{
    padding: 0 3%;
  }
}

</style>
