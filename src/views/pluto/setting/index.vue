<template>
  <div>
    <button @click="resetProperty">Reset</button>
  </div>
</template>

<script>
import {resetProperty} from "@/api/property";

export default {
  name: "index",
  methods: {
    resetProperty(){
      resetProperty().then(() => {
        this.$message.success("重置博客设置成功")
        this.$store.dispatch('getBlogProperty')
      }, error => {
        this.$message.error("重置博客设置失败: " + error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
