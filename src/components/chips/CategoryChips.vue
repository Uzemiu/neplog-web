<template>
  <div class="category-chips">
    <chips
      chip-key="id"
      label="name"
      :show-delete-icon="false"
      v-bind="$attrs"
      v-on="$listeners">
      <template slot-scope="{item}">
        <span>{{item.name}}</span>
        <span class="category-article-count">{{item.articleCount}}</span>
      </template>
    </chips>

  </div>
</template>

<script>
import Chips from "@/components/chips/index";
export default {
name: "CategoryChips",
  components: {Chips},
}
</script>

<style lang="scss" scoped>
.category-chips{
  .category-article-count{
    margin-left: 10px;
    color: var(--text-color-gray);
  }
}
</style>
