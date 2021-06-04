<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="80px"
      class="cover-setting">

    <div v-for="(glide,i) in glideProperties" :key="i">
      <el-form-item :label="`${glide.label}封面:`">
        <el-upload
          drag
          action="#"
          :show-file-list="false"
          :before-upload="getCropFunction(glide.key)"
          :http-request="ignore">
          <img :src="property[glideImageKey(glide.key)] || GlideConfig[glideImageKey(glide.key)]" class="page-cover">
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-input
          v-model="property[glideImageKey(glide.key)]"
          :placeholder="`${glide.label}封面URL`"
          @change="updatePropertyByKey(glideImageKey(glide.key), true)"></el-input>
      </el-form-item>
      <el-form-item :label="`${glide.label}标题:`">
        <el-input
          v-model="property[glideTitleKey(glide.key)]"
          :placeholder="`${glide.label}标题`"
          @change="updatePropertyByKey(glideTitleKey(glide.key), true)"></el-input>
      </el-form-item>
    </div>

  </el-form>
</template>

<script>
import {uploadCover} from "@/api/file";
import property from "@/mixins/property";
import GlideConfig from "@/config/glide";

export default {
  name: "CoverSetting",
  mixins: [property],
  data() {
    return {
      property: {},
      cropCoverOption: {
        autoCropWidth: 1900,
        autoCropHeight: 1000,
      },
      glideProperties: [
        {label: '首页', key: 'home'},
        {label: '友链', key: 'friend'},
        {label: '归档', key: 'archive'},
        {label: '标签', key: 'tag'},
        {label: '分类', key: 'category'},
        {label: '关于', key: 'about'},
        {label: '统计', key: 'statics'},
      ],
      GlideConfig: GlideConfig
    }
  },
  mounted() {
    for(const glideConfig of this.glideProperties){
      const ik = this.glideImageKey(glideConfig.key);
      const tk = this.glideTitleKey(glideConfig.key);
      this.$set(this.property, ik, this.$store.getters.blogConfig[ik]);
      this.$set(this.property, tk, this.$store.getters.blogConfig[tk]);
    }
  },
  methods: {
    ignore(){},
    cropImage(file,key){
      this.$crop(file,(blob, filename, close) => {
        uploadCover(blob, filename).then((url) => {
          this.property[key] = url;
          this.updatePropertyByKey(key, true)
            .then(() => close());
        }).catch(() => {})
      },this.cropCoverOption)
    },
    getCropFunction(key){
      return file => this.cropImage(file, this.glideImageKey(key));
    },
    glideImageKey(key){
      return `glide_image_${key}`;
    },
    glideTitleKey(key){
      return `glide_title_${key}`;
    },
  },
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
