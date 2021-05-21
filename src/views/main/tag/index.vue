<template>
  <div class="article-tag">
    <glide :glides="glides"></glide>
    <chip-article ref="chipArticle">
      <tag-chips
        slot="chips"
        :data="tags"
        :editable="false"
        @chipClick="handleChipClick">
      </tag-chips>
    </chip-article>
  </div>
</template>

<script>
import TagChips from "@/components/chips/TagChips";
import Glide from "@/components/glide/index"
import {getAllTags} from "@/api/tag";
import GlideConfig from "@/config/glide"
import ChipArticle from "@/components/chips/ChipArticle";

export default {
  name: "ArticleTag",
  components: {
    TagChips,
    ChipArticle,
    Glide,
  },
  props: {
    id: [String, Number]
  },
  data(){
    return{
      tags: [],
      glides: [{
        img: GlideConfig.tagPageImage,
        title: 'TAGS'
      }]
    }
  },
  methods: {
    handleChipClick({id}){
      this.$refs.chipArticle.query.tagId = [id];
      this.$refs.chipArticle.listArticles();
    }
  },
  mounted() {
    getAllTags().then(data => {
      this.tags = data;
    }).catch(() => {})

    let id = Number.parseInt(this.id);
    if(id){
      this.handleChipClick({id: id});
    }
  }
}
</script>

<style lang="scss" scoped>
.article-tag{
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
