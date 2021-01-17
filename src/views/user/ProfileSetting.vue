<template>
  <el-form
      :model="user"
      label-position="left"
      label-width="80px"
      class="profile-setting">
    <el-form-item label="用户名:">
      <el-input
          style="max-width: 240px"
          :disabled="true"
          v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="昵称:">
      <el-input
          style="max-width: 240px"
          v-model="user.nickname"></el-input>
    </el-form-item>
    <el-form-item label="个人站点:">
      <el-input
          style="max-width: 240px"
          v-model="user.site"></el-input>
    </el-form-item>
    <el-form-item label="个人头像:">
      <el-upload
          drag
          action="#"
          :before-upload="cropAvatar"
          :http-request="uploadImg"
          :show-file-list="false">
        <img v-if="user.avatar" :src="user.avatar" class="user-avatar">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input v-model="user.avatar" placeholder="头像URL"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          class="nep-button-primary"
          style="line-height: 23px;width: 88px"
          :loading="loading"
          @click="updateUserInfo">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {uploadAvatar} from "@/api/file";

export default {
  name: "ProfileSetting",
  data(){
    return {
      user: {
        username: '',
        nickname: '',
        site: '',
        avatar: '',
        email: ''
      },
      cropAvatarOption: {
        autoCropWidth: 240,
        autoCropHeight: 240,
        fixed:true,
      },
      loading: false
    }
  },
  mounted() {
    this.user = this.$store.getters.user;
  },
  methods: {
    cropAvatar(file) {
      this.$crop(file,(blob, filename) => {
        uploadAvatar(blob, filename).then((url) => {
          this.user.avatar = url;
        })
        return true;
      },this.cropAvatarOption)
    },
    updateUserInfo(){
      this.loading = true;
      this.$emit('beforeUpdate');
      this.$store.dispatch('updateUserInfo', this.user).then(() => {
        this.$message.success('更新个人信息成功');
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    },
    uploadImg(){}
  }
}
</script>

<style lang="scss" scoped>
.profile-setting{
  ::v-deep {
    .el-upload-dragger {
      width: 240px;
      height: 240px;
      overflow: hidden;
    }
  }
  .user-avatar{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
