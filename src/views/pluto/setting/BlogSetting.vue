<template>
  <el-form :model="property" label-position="top" label-width="75px" class="blog-setting">
    <el-form-item label="博客名称:">
      <el-input
          style="max-width: 240px"
          v-model="property.blogName"
          @blur="updateProperty('blogName')"></el-input>
    </el-form-item>
    <el-form-item label="博客头像:">
      <el-upload
          :disabled="disableBlogAvatar"
          class="avatar-upload"
          drag
          action="#"
          :before-upload="uploadBlogAvatar"
          with-credentials
          multiple>
        <img v-if="property.blogAvatar" :src="property.blogAvatar" class="blog-avatar">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-radio-group v-model="property.blogAvatarType">
        <el-radio :label="'auto'">用户头像</el-radio>
        <el-radio :label="'custom'">自定义头像</el-radio>
      </el-radio-group>
      <el-input v-model="property.blogAvatar" :disabled="disableBlogAvatar"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/views/pluto/setting/property";

export default {
  name: "BlogSetting",
  mixins: [property],
  data() {
    return {
      property: {
        blogName: this.$store.getters.blogProperty.blogName,
        blogAvatarType: 'auto',
        blogAvatar: require("@/assets/imgs/tomorinao.jpg"),
      },
    }
  },
  mounted() {

  },
  methods: {
    uploadBlogAvatar() {

    },
  },
  computed: {
    disableBlogAvatar() {
      return this.property.blogAvatarType === 'auto';
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-setting {
  ::v-deep {
    .el-form-item__label {
      font-size: 15px;
      padding-right: 5px;
      min-width: 75px;
    }
    .el-upload-dragger {
      width: 200px;
      height: 200px;
    }
    .el-form-item{
      display: flex;
      flex-direction: row;
    }
  }

  .blog-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 576px) {
  .blog-setting{
    ::v-deep{
      .el-form-item{
        flex-direction: column;
      }
      .el-form-item__label {
        padding-bottom: 0;
      }
    }
  }
}
</style>
