<template>
  <el-form
      :model="param"
      label-position="left"
      label-width="80px"
      class="password-setting">
    <el-form-item label="原密码:">
      <el-input
          style="max-width: 300px"
          type="password"
          v-model="param.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码:">
      <el-input
          style="max-width: 300px"
          type="password"
          v-model="param.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="重复密码:">
      <el-input
          style="max-width: 300px"
          type="password"
          v-model="param.repeatPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          class="nep-button-primary"
          style="line-height: 23px;width: 120px"
          :loading="loading"
          @click="resetPassword">重置密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {resetPassword} from "@/api/user";
import AESUtil from "@/utils/AESUtil";

export default {
  name: "PasswordSetting",
  data(){
    return {
      param: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      },
      loading: false,
    }
  },
  methods: {
    resetPassword(){
      if(this.param.newPassword !== this.param.repeatPassword){
        this.$message.error("重复密码与新密码不一致");
        return;
      }

      this.loading = true;
      this.$emit('beforeUpdate');
      resetPassword({
        oldPassword: AESUtil.encrypt(this.param.oldPassword),
        newPassword: AESUtil.encrypt(this.param.newPassword)
      }).then(() => {
        this.$message.success('重置密码成功');
        location.reload();
        this.$emit('afterUpdate',true);
      }).catch(() => {
        this.$emit('afterUpdate',false);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
