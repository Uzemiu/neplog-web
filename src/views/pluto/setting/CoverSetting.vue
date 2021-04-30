<template>
  <el-form
      :model="config"
      label-position="left"
      label-width="80px"
      class="cover-setting">
    <el-form-item label="首页封面:">
      <el-upload
        v-if="isHomePageCover"
        drag
        action="#"
        :show-file-list="false"
        :before-upload="cropHomePage"
        :http-request="uploadCover">
        <img v-if="config.homePageCover" :src="config.homePageCover" class="page-cover">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-radio-group v-model="isHomePageCover">
        <el-radio :label="false">显示文章</el-radio>
        <el-radio :label="true">自定义图片</el-radio>
      </el-radio-group>
      <el-input
          v-model="config.homePageCover"
          @blur="updateConfigByKey('homePageCover', configName)"></el-input>
    </el-form-item>
    <el-form-item label="首页标题:" v-if="isHomePageCover">
      <el-input
          v-model="config.homePageTitle"
          @blur="updateConfigByKey('homePageTitle', configName)"></el-input>
    </el-form-item>
    <el-form-item label="友链封面:">
      <el-upload
          drag
          action="#"
          :show-file-list="false"
          :before-upload="cropFriendPage"
          :http-request="uploadCover">
        <img v-if="config.friendPageCover" :src="config.friendPageCover" class="page-cover">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input
          v-model="config.friendPageCover"
          placeholder="封面URL"
          @blur="updateConfigByKey('friendPageCover', configName)"></el-input>
    </el-form-item>
    <el-form-item label="友链标题:">
      <el-input
          v-model="config.friendPageTitle"
          @blur="updateConfigByKey('friendPageTitle', configName)"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/mixins/config";
import {uploadCover} from "@/api/file";

export default {
  name: "CoverSetting",
  data() {
    return {
      config: {
        friendPageCover: this.$store.getters.blogConfig.friendPageCover,
        friendPageTitle: this.$store.getters.blogConfig.friendPageTitle,
        // 数字表示首页显示glides数量
        // 链接表示显示单张图片
        homePageCover: this.$store.getters.blogConfig.homePageCover,
        homePageTitle: this.$store.getters.blogConfig.homePageTitle,
      },
      isHomePageCover: false,
      currentFile: null,
      imageBase64: '',
      configName: 'blog',

      cropCoverOption: {
        autoCropWidth: 1900,
        autoCropHeight: 1000,
      }
    }
  },
  mixins: [property],
  mounted() {
    this.isHomePageCover = !Number.parseInt(this.config.homePageCover)
  },
  methods: {
    uploadCover(){},
    cropImage(file,key){
      this.$crop(file,(blob, filename, close) => {
        uploadCover(blob, filename).then((url) => {
          this.config[key] = url;
          this.updateConfigByKey(key, this.configName)
            .then(() => close());
        }).catch(() => {})
      },this.cropCoverOption)
    },
    cropHomePage(file){
      this.cropImage(file,'homePageCover');
    },
    cropFriendPage(file){
      this.cropImage(file,'friendPageCover');
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.cover-setting {

  ::v-deep {
    .el-upload-dragger {
      width: 100%;
      height: 40vh;
    }
    .el-upload{
      width: 100%;
    }
  }
  .page-cover {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
}
</style>
