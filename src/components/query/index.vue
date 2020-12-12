<template>
  <el-form :inline="true" :model="filter">
    <el-form-item>
      <el-input type="text" v-model="filter.deleted"></el-input>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      filter: {
        deleted: false
      }
    }
  },
  mounted() {
    console.log(this.$slots)
  },
}
</script>

<style lang="scss" scoped>

</style>
