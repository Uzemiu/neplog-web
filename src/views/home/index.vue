<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="home-slides"></glide>
    <div></div>
    <showcase class="article-list">
      <ul>
        <li class="article-item" v-for="(article,i) in articles" :key="i">
          <article-card class="article-card" :article="article"></article-card>
            <router-link :to="'/article/' + article.id" class="arrow">
              <i class="fa fa-angle-right"></i>
            </router-link>
        </li>
      </ul>
    </showcase>
  </div>
</template>

<script>
import Showcase from "../../components/showcase/index";
import Glide from "../../components/glide/index"
import ArticleCard from "../../components/article-card/ArticleCard";
import {findArticle} from "@/api/article";

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
      }, {
        id: 456,
        link: `/article/${this.id}`,
        img: require('@/assets/imgs/75977007_p0.jpg'),
        title: 'EXTER'
      }],
      articles: []
    }
  },
  mounted() {
    findArticle(this.$store.getters.homePageArticle).then(data => {
      this.articles = data;
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

  .article-item{
    margin-bottom: 20px;
    position: relative;

    .article-card{
      transition: .4s;
      background-color: #fff;
    }

    .arrow{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      width: 50px;
      top: 0;
      right: 0;
      z-index: -1;
      .fa{
        font-size: 50px;
        color: var(--secondary-blue);
      }
    }
  }
}

@media (min-width: 998px){
  .content-wrapper{
    .article-item{
      &:hover {
        .article-card{
          transform: translateX(-50px);
        }
        .arrow{
          transition: .4s .1s;
          z-index: 0;
        }
      }
    }
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
