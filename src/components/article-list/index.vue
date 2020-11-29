<template>
  <showcase>
    <ul class="article-list">
      <li>
        <article-card>

        </article-card>
      </li>
    </ul>
  </showcase>
</template>

<script>
  import Showcase from "../showcase/index";
  import ArticleCard from "./ArticleCard";
  export default {
    name: "ArticleList",
    components: {Showcase,ArticleCard}
  }
</script>

<style lang="scss" scoped>
.article-list{
  display: flex;
  flex-direction: column;

}
</style>
