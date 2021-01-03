<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="home-slides" ref="glide"></glide>
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
import Showcase from "../../components/layout/Responsive";
import Glide from "../../components/glide/index"
import ArticleCard from "../../components/article/ArticleCard";
import {queryBy} from "@/api/article";
import {fromArticle} from "@/utils/glide";

export default {
  name: "About",
  components: {
    ArticleCard,
    Showcase,
    Glide
  },
  data(){
    return {
      glides: [],
      articles: []
    }
  },
  mounted() {
    let cover = this.$store.getters.blogProperty.homePageCover;
    if(!Number.parseInt(cover)){
      this.glides.push({
        img:cover
      })
    }
    queryBy({sort: this.$store.getters.homePageArticle}).then(data => {
      this.articles = data;
      if(this.glides.length === 0){
        this.glides = fromArticle(...(data.slice(0, Number.parseInt(cover))));
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
