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
    <el-form-item label="博客头像:">
      <el-upload
          v-if="!isCopping"
          :disabled="disableBlogAvatar"
          class="avatar-upload"
          drag
          action="#"
          :before-upload="cropAvatar"
          :http-request="uploadImg"
          :show-file-list="false">
        <img v-if="property.blogAvatar"
             slot="trigger"
             :src="property.blogAvatar"
             class="blog-avatar">
      </el-upload>
      <el-radio-group v-model="property.customBlogAvatar">
        <el-radio :label="'auto'">用户头像</el-radio>
        <el-radio :label="'custom'">自定义头像</el-radio>
      </el-radio-group>
      <el-input v-model="property.blogAvatar" :disabled="disableBlogAvatar"></el-input>
    </el-form-item>
<!--    <el-form-item label="作者名称:">-->
<!--      <el-radio-group v-model="property.authorNameType">-->
<!--        <el-radio :label="'auto'">用户昵称</el-radio>-->
<!--        <el-radio :label="'custom'">自定义名称</el-radio>-->
<!--      </el-radio-group>-->
<!--      <el-input v-model="property.authorName"></el-input>-->
<!--    </el-form-item>-->
  </el-form>
</template>

<script>
import property from "@/mixins/property";
import {uploadAvatar} from "@/api/file";

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
      imgBase64: '',
      isCopping: false,
      imgName: '',

      cropAvatarOption: {
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixed:true,
      }
    }
  },
  mounted() {
    this.property.customBlogAvatar =
      this.$store.getters.user.avatar === this.property.blogAvatar ? 'auto' : 'custom'
  },
  methods: {
    cropAvatar(file) {
      this.$crop(file,(blob, filename) => {
        uploadAvatar(blob, filename).then((url) => {
          this.property.blogAvatar = url;
          this.updatePropertyByKey('blogAvatar');
        })
        return true;
      },this.cropAvatarOption)
    },
    uploadImg(){}
  },
  computed: {
    disableBlogAvatar() {
      return this.property.customBlogAvatar === 'auto';
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-setting {

  ::v-deep {
    .el-upload-dragger {
      width: 200px;
      height: 200px;
      overflow: unset;
    }
  }

  .blog-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
