<template>
  <el-dialog
    title="裁剪图片"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :top="dialogTop"
    :width="dialogWidth"
    max-width="100%">
    <vue-cropper
      ref="cropper"
      :outputSize="1"
      :img="imageBase64"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :centerBox="option.centerBox"
      :infoTrue="option.infoTrue"
      :fixed="option.fixed"
      :fixedBox="option.fixedBox"
      :full="option.full">

    </vue-cropper>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="endCrop">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {VueCropper} from "vue-cropper"
import NeplogConfig from "@/config/neplog";
import {convertFileSize} from "@/utils/convert";

export default {
  name: "index",
  data(){
    return {
      done: Function,
      reader: new FileReader(),
      imageBase64: '',
      filename: '',

      dialogTop: '15vh',
      dialogWidth: '80%',
      dialogVisible: false,

      option: {
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixed: false,
        fixedBox: false,
        centerBox: true,
        infoTrue: true,
        full: true,
      }
    }
  },
  components: {
    VueCropper
  },
  created() {
    this.reader.onload = e => {
      this.imageBase64 = e.target.result;
    }
  },
  methods: {
    closeDialog(){
      this.dialogVisible = false;
    },
    endCrop(){
      this.$refs.cropper.getCropBlob(blob => {
        if(blob.size > NeplogConfig.maxImageSize){
          this.$message.error("文件大小不能超过"+convertFileSize(NeplogConfig.maxImageSize));
        } else {
          this.done && this.done(blob, this.filename, this.closeDialog);
        }
      })
    },
    defaultOption(){
      return {
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixed: false,
        fixedBox: false,
        centerBox: true,
        infoTrue: true,
        full: true,
      }
    },
    startCrop(file,done,option){
      this.option = this.defaultOption();
      Object.assign(this.option, option)
      this.filename = file.name;
      this.done = done;
      this.dialogVisible = true;
      this.reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-dialog__body{
    height: 50vh;
    padding: 0 10px;
  }
}
</style>
