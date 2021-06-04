<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="80px"
      class="other-setting">
    <el-form-item label="备案号:">
      <el-input
          v-model="property.icp"
          @change="updateConfigByKey('icp', 'blog', true)"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/mixins/config";

export default {
  name: "OtherSetting",
  data() {
    return {
      property: {
        icp: this.$store.getters.blogConfig.icp,
      },
    }
  },
  mixins: [property],
}
</script>

<style lang="scss" scoped>
.other-setting{
}
</style>
