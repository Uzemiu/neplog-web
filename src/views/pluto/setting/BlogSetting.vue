<template>
  <el-form
      :model="config"
      label-position="left"
      label-width="80px"
      class="blog-setting">
    <el-form-item label="博客名称:">
      <el-input
          style="max-width: 240px"
          v-model="config.blogName"
          @change="updateConfigByKey('blogName', 'blog', true)"></el-input>
    </el-form-item>
    <el-form-item label="备案号:">
      <el-input
        v-model="config.icp"
        @change="updateConfigByKey('icp', 'blog', true)"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import config from "@/mixins/config";

export default {
  name: "BlogSetting",
  mixins: [config],
  data() {
    return {
      config: {
        blogName: this.$store.getters.blogConfig.blogName,
        customBlogAvatar: 'auto',
        blogAvatar: this.$store.getters.blogConfig.blogAvatar,
        authorNameType: 'auto',
        authorName: this.$store.getters.blogConfig.authorName,
        icp: this.$store.getters.blogConfig.icp
      },
    }
  },
  mounted() {
    this.config.customBlogAvatar =
      this.$store.getters.user.avatar === this.config.blogAvatar ? 'auto' : 'custom';
  },
  methods: {
  },
  computed: {
    disableBlogAvatar() {
      return this.config.customBlogAvatar === 'auto';
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
