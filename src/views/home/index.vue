<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="home-slides"></glide>
    <showcase class="article-list">
      <ul>
        <li class="article-item" v-for="(article,i) in articles" :key="i">
          <article-card :article="article"></article-card>
        </li>
      </ul>
    </showcase>
  </div>
</template>

<script>
import Showcase from "../../components/showcase/index";
import Glide from "../../components/glide/index"
import {articleList} from "../../utils/mock";
import ArticleCard from "../../components/article-list/ArticleCard";

export default {
  name: "About",
  components: {
    ArticleCard,
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
      }],
      articles: articleList
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

  .article-item{
    margin-bottom: 20px;


  }
}


@media (min-width: 769px) {
  .content-wrapper{
    .article-item{
      &:nth-child(2n) ::v-deep .article-card{
        grid-template-areas: "content cover";
        grid-template-columns: 1fr 360px;
      }
    }
  }
}

@media (max-width: 576px) {
  .article-list{
    padding: 0 3%;
  }
}

</style>
