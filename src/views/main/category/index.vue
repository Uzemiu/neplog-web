<template>
  <div class="article-category">
    <glide :glides="glides"></glide>
    <chip-article ref="chipArticle">
      <category-chips
        slot="chips"
        :data="categories"
        :editable="false"
        @chipClick="handleChipClick">
      </category-chips>
      <p class="no-more" v-if="categories.length===0" slot="chips">好像还没有创建过一个分类哦...</p>
    </chip-article>
  </div>
</template>

<script>
import Glide from "@/components/glide/index";
import CategoryChips from "@/components/chips/CategoryChips";
import ChipArticle from "@/components/chips/ChipArticle";
import {queryCategoryBy} from "@/api/category";
import GlideConfig from "@/config/glide";

export default {
  name: "ArticleCategory",
  components: {ChipArticle, CategoryChips, Glide},
  props: {
    id: [Number, String]
  },
  data(){
    return{
      glides: [GlideConfig.glideFromKey('category')],
      categories: [],
      query:{
        showCount: true,
        showUncategorized: true,
      }
    }
  },
  methods: {
    handleChipClick({id}){
      this.$refs.chipArticle.query.categoryId = [id];
      this.$refs.chipArticle.listArticles();
    }
  },
  mounted() {
    queryCategoryBy(this.query).then(data => {
      this.categories = data;
    }).catch(() => {})

    let id = Number.parseInt(this.id);
    if(id){
      this.handleChipClick({id});
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
