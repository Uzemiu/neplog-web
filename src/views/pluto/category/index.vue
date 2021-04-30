<template>
  <div>
    <h2 class="sharp-header">分类管理</h2>
    <div class="container">
      <section class="category-section">
        <category-menu></category-menu>
      </section>
      <section class="tag-section">
        <category-menu></category-menu>
      </section>
    </div>
  </div>
</template>

<script>


import CategoryMenu from "@/views/pluto/category/CategoryMenu";
export default {
  name: "PlutoCategory",
  components: {
    CategoryMenu
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: start;

  section{
    width: 50%;
    padding: 20px;
  }
}
</style>
