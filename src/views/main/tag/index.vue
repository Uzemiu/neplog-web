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
      <p class="no-more" v-if="tags.length===0" slot="chips">好像还没有创建过一个标签哦...</p>
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
      glides: [GlideConfig.glideFromKey('tag')]
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
