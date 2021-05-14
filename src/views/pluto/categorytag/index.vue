<template>
  <div>
    <div class="container">
      <section class="category-section">
        <h2 class="sharp-header">分类管理</h2>
        <category-menu></category-menu>
      </section>
      <section class="tag-section">
        <h2 class="sharp-header">标签管理</h2>
        <tag-chips
          :editable="true"
          :tags="tags"
          :chip-click="editTag"
          :delete-click="deleteTag"></tag-chips>
      </section>
    </div>
  </div>
</template>

<script>


import CategoryMenu from "@/components/category/CategoryMenu";
import TagChips from "@/components/chips/TagChips";
import {deleteTag, getAllTags, updateTag} from "@/api/tag";
export default {
  name: "PlutoCategory",
  components: {
    TagChips,
    CategoryMenu
  },
  data(){
    return {
      tags: []
    }
  },
  methods: {
    editTag(tag){
      this.$prompt('',{
        title: '修改标签名',
        customClass: 'responsive',
        inputValue: tag.tag
      }).then(({value}) => {
        if(value !== tag.name){
          updateTag({
            id: tag.id,
            tag: value,
          }).then(() => {
            this.$message.success('修改分类成功');
            tag.tag = value;
          }).catch(() => {})
        }
      }).catch(() => {})
    },
    deleteTag(tag){
      this.$confirm(`确认删除标签 ${tag.tag} 吗?`,{
        title: '删除标签',
        type: 'warning',
        customClass: 'responsive'
      }).then(() => {
        return deleteTag(tag.id);
      }).then(() => {
        this.$message.success('删除标签成功')
        this.refreshTag();
      }).catch(() => {})
    },
    refreshTag(){
      getAllTags().then(data => {
        this.tags = data;
      }).catch(() => {})
    }
  },
  mounted() {
    this.refreshTag();
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: start;

  section{
    width: 100%;
    padding: 10px;
  }

  h2{
    margin-bottom: 12px;
  }
}

@media (max-width: 960px) {
  .container{
    flex-wrap: wrap;
  }
}
</style>
