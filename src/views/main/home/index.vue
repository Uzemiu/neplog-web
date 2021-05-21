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
    </responsive>
  </div>
</template>

<script>
import Responsive from "../../../components/layout/Responsive";
import Glide from "../../../components/glide/index"
import {queryArticleBy} from "@/api/article";
import {fromArticle} from "@/utils/glide";
import ArticleList from "@/components/article/ArticleList";

export default {
  name: "About",
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
    let cover = this.$store.getters.blogConfig.homePageCover;
    if(!Number.parseInt(cover)){
      this.glides.push({
        img:cover,
        title: this.$store.getters.blogConfig.homePageTitle
      })
    }
    queryArticleBy({sort: 'updateTime,desc'}).then(articles => {
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
