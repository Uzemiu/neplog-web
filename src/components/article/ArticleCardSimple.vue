<template>
  <div class="article-card-simple">
    <router-link :to="`/article/${article.id}`">
      <div class="backdrop"></div>
      <img v-lazy="article.cover" :alt="article.title" class="article-cover"/>
      <div class="content">
        <p>{{titleTip}}</p>
        <span>{{article.title}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleCardSimple",
  props: {
    article: {},
    titleTip: {
      type: String,
      default: '上一篇文章'
    }
  },
}
</script>

<style lang="scss" scoped>
.article-card-simple{
  height: 100%;
  overflow: hidden;

  a{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    padding: 40px 40px;
    text-align: left;
  }

  .article-cover{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .backdrop{
    position: absolute;
    background-color: rgb(42, 42, 42);
    opacity: .6;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    border: 0;
    left: 0;
    transition: opacity .15s ease-out;

  }

  .content{
    width: 100%;
    z-index: 60;
    font-size: 15px;
    text-align: left;
  }

  p{
    color: #fff;
    opacity: .7;
  }
  span{
    color: #fff;
  }

  &:hover .backdrop{
    opacity: .4;
  }
}
</style>
