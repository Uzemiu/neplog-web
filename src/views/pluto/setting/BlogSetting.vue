<template>
  <el-form
      :model="property"
      label-position="top"
      label-width="75px"
      class="blog-setting">
    <el-form-item label="博客名称:">
      <el-input
          style="max-width: 240px"
          v-model="property.blogName"
          @blur="updateProperty('blogName')"></el-input>
    </el-form-item>
    <el-form-item label="博客头像:">
      <vue-cropper
        v-if="isCopping"
        ref="cropper"
        style="width: 200px;height: 200px"
        :img="imgBase64"
        :fixed-box="false"
        :fixed="true"
        :canMoveBox="false"
        :centerBox="true"
        :autoCrop="true"
        :autoCropWidth="'200px'"
        :autoCropHeight="'200px'">
      </vue-cropper>
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
import {VueCropper} from "vue-cropper"
import property from "@/mixins/property";
import {getBase64FromFile} from "@/utils/image";
import {uploadAvatar, uploadCover} from "@/api/file";

export default {
  name: "BlogSetting",
  mixins: [property],
  components:{
    VueCropper
  },
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
        uploadCover(blob, filename).then((url) => {
          this.property.blogAvatar = url;
          this.updateProperty('blogAvatar');
        })
        return true;
      },this.cropAvatarOption)
    },
    completeCrop(){
      this.$refs.cropper.getCropBlob(blob => {
        uploadAvatar(blob,this.imgName).then(url => {
          this.property.blogAvatar = url;
          this.isCopping = false;
          this.updateProperty('blogAvatar')
        })
      });
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

  @import "pluto-setting";

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
