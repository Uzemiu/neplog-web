<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="80px"
      class="cover-setting">
    <el-form-item label="首页封面:">
      <el-upload
        v-if="isHomePageCover"
        class="cover-upload"
        drag
        action="#"
        :show-file-list="false"
        :before-upload="cropHomePage"
        :http-request="uploadCover">
        <img v-if="property.homePageCover" :src="property.homePageCover" class="page-cover">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-radio-group v-model="isHomePageCover">
        <el-radio :label="false">显示文章</el-radio>
        <el-radio :label="true">自定义图片</el-radio>
      </el-radio-group>
      <el-input
          v-model="property.homePageCover"
          @blur="updatePropertyByKey('homePageCover')"></el-input>
    </el-form-item>
    <el-form-item label="首页标题:" v-if="isHomePageCover">
      <el-input
          v-model="property.homePageTitle"
          @blur="updatePropertyByKey('homePageTitle')"></el-input>
    </el-form-item>
    <el-form-item label="友链封面:">
      <el-upload
          class="cover-upload"
          drag
          action="#"
          :show-file-list="false"
          :before-upload="cropFriendPage"
          :http-request="uploadCover">
        <img v-if="property.friendPageCover" :src="property.friendPageCover" class="page-cover">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input
          v-model="property.friendPageCover"
          placeholder="封面URL"
          @blur="updatePropertyByKey('friendPageCover')"></el-input>
    </el-form-item>
    <el-form-item label="友链标题:">
      <el-input
          v-model="property.friendPageTitle"
          @blur="updatePropertyByKey('friendPageTitle')"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/mixins/property";
import {uploadCover} from "@/api/file";

export default {
  name: "CoverSetting",
  data() {
    return {
      property: {
        friendPageCover: this.$store.getters.blogProperty.friendPageCover,
        friendPageTitle: this.$store.getters.blogProperty.friendPageTitle,
        // 数字表示首页显示glides数量
        // 链接表示显示单张图片
        homePageCover: this.$store.getters.blogProperty.homePageCover,
        homePageTitle: this.$store.getters.blogProperty.homePageTitle,
      },
      isHomePageCover: false,
      currentFile: null,
      imageBase64: '',

      cropCoverOption: {
        autoCropWidth: 1900,
        autoCropHeight: 1000,
      }
    }
  },
  mixins: [property],
  mounted() {
    this.isHomePageCover = !Number.parseInt(this.property.homePageCover)
  },
  methods: {
    uploadCover(){},
    cropImage(file,key){
      this.$crop(file,(blob, filename) => {
        console.log(blob)
        uploadCover(blob, filename).then((url) => {
          this.property[key] = url;
          this.updatePropertyByKey(key);
        })
        return true;
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
