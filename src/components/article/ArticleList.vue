<template>
  <ul class="article-list">
    <li class="article-item"
        :class="{'show-arrow':showArrow}"
        v-scroll-reveal.reset
        v-for="article in articles"
        :key="article.id">
      <article-card class="article-card" :article="article" v-bind="$attrs"></article-card>

      <router-link v-if="showArrow" :to="'/article/' + article.id" class="arrow">
        <i class="fa fa-angle-right"></i>
      </router-link>
    </li>
  </ul>
</template>

<script>
import ArticleCard from "@/components/article/ArticleCard";

export default {
  name: "ArticleList",
  components: {
    ArticleCard
  },
  props: {
    articles: {
      type: Array,
      default: function (){
        return [];
      }
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    crossImage: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list{

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
  .article-list{
    .article-item.show-arrow:hover{
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

</style>
