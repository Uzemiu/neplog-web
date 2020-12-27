<template>
  <el-form :model="property" label-position="left" label-width="75px" class="cover-setting">
    <el-form-item label="首页封面:">
      <el-radio-group v-model="property.blogAvatarType">
        <el-radio :label="'auto'">显示文章</el-radio>
        <el-radio :label="'custom'">自定义图片</el-radio>
      </el-radio-group>
      <el-input
          style="max-width: 260px"
          v-model="property.blogName"
          @blur="updateProperty('blogName')"></el-input>
    </el-form-item>
    <el-form-item label="友链封面:">
      <el-upload
          class="cover-upload"
          drag
          action="#"
          :show-file-list="false"
          :http-request="uploadCover">
        <img v-if="property.friendPageCover" :src="property.friendPageCover" class="page-cover">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input v-model="property.friendPageCover"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/views/pluto/setting/property";

export default {
  name: "CoverSetting",
  data() {
    return {
      property: {
        friendPageCover: this.$store.getters.blogProperty.friendPageCover
      },
    }
  },
  mixins: [property],
  methods: {
    uploadCover(){

    }
  }
}
</script>

<style lang="scss" scoped>
.cover-setting {
  ::v-deep {
    .el-form-item__label {
      font-size: 15px;
      padding-right: 4px;
    }

    .el-upload-dragger {
      width: 100%;
      height: 30vh;
    }
    .el-upload{
      width: 100%;
    }
  }

  .page-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 992px) {

}

@media (max-width: 768px) {

}

@media (max-width: 576px) {

}
</style>
