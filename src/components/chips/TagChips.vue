<template>
  <div class="tag-chips">
    <chips
      chip-key="id"
      label="name"
      :show-delete-icon="editable"
      v-bind="$attrs"
      v-on="$listeners">
      <template slot-scope="{item}">
        <span>{{item.name}}</span>
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
    editable: {
      type: Boolean,
      default: false
    },
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
