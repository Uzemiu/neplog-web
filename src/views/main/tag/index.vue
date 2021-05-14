<template>
  <div class="article-tag">
    <glide :glides="glides"></glide>
    <responsive class="tag-list">
      <tag-chips
        :tags="tags"
        :editable="false">
      </tag-chips>
    </responsive>
  </div>
</template>

<script>
import TagChips from "@/components/chips/TagChips";
import Glide from "@/components/glide/index"
import Responsive from "@/components/layout/Responsive";
import {getAllTags} from "@/api/tag";
export default {
  name: "ArticleTag",
  components: {
    TagChips,
    Glide,
    Responsive
  },
  data(){
    return{
      tags: [],
      glides: [{
        img: require('@/assets/imgs/glide/320886.jpg'),
        title: 'TAGS'
      }]
    }
  },
  methods: {

  },
  mounted() {
    getAllTags().then(data => {
      this.tags = data;
    }).catch(() => {})
  }
}
</script>

<style lang="scss" scoped>
.article-tag{
  display: flex;
  align-items: center;
  flex-direction: column;

  .tag-list{
    padding: 16px 0;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07)
  }
}
</style>
