<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="80px"
      class="blog-setting">
    <el-form-item label="博客名称:">
      <el-input
          style="max-width: 240px"
          v-model="property.blogName"
          @blur="updatePropertyByKey('blogName')"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/mixins/property";

export default {
  name: "BlogSetting",
  mixins: [property],
  data() {
    return {
      property: {
        blogName: this.$store.getters.blogProperty.blogName,
        customBlogAvatar: 'auto',
        blogAvatar: this.$store.getters.blogProperty.blogAvatar,
        authorNameType: 'auto',
        authorName: this.$store.getters.blogProperty.authorName,
      },
    }
  },
  mounted() {
    this.property.customBlogAvatar =
      this.$store.getters.user.avatar === this.property.blogAvatar ? 'auto' : 'custom';
  },
  methods: {
  },
  computed: {
    disableBlogAvatar() {
      return this.property.customBlogAvatar === 'auto';
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
