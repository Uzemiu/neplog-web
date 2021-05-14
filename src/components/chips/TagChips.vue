<template>
  <div class="tag-chips">
    <chips
      :data="tags"
      chip-key="id"
      label="tag"
      :show-delete-icon="editable"
      @chipClick="chipClick"
      @deleteClick="deleteClick">
      <template slot-scope="{item}">
        <span>{{item.tag}}</span>
        <span class="tag-article-count">{{item.articleCount}}</span>
      </template>
    </chips>

  </div>
</template>

<script>
import Chips from "@/components/chips/index";
export default {
  name: "TagChips",
  components: {Chips},
  props: {
    tags:{
      type: Array,
      default: function (){
        return [];
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    chipClick: {
      type: Function,
      default: function (){
        return function (){};
      }
    },
    deleteClick: {
      type: Function,
      default: function (){
        return function (){};
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-chips{
  .tag-article-count{
    margin-left: 10px;
    color: var(--text-color-gray);
  }
}
</style>
