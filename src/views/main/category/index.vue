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
      glides: [{title: 'Category', img:GlideConfig.categoryPageImage}],
      categories: []
    }
  },
  methods: {
    handleChipClick({id}){
      this.$refs.chipArticle.query.categoryId = [id];
      this.$refs.chipArticle.listArticles();
    }
  },
  mounted() {
    queryCategoryBy({showCount: true}).then(data => {
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
