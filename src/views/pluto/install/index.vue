<template>
  <div class="common-flex">
    <div class="install-section">
      <h2>Install</h2>
      <el-form :model="installParam" style="margin-top: 20px">

        <el-form-item :rules="[{min: 6, max: 32, message: '请输入博客名'}]">
          <el-input v-model="installParam.blogName" placeholder="BlogName"></el-input>
        </el-form-item>

        <el-form-item :rules="[{min: 6, max: 32, message: '请输入用户名'}]">
          <el-input v-model="installParam.username" placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item :rules="[{required: true,message: '请输入密码'}]">
          <el-input v-model="installParam.password" placeholder="Password" type="password"></el-input>
        </el-form-item>

        <el-form-item :rules="[{required: true,message: '请输入密码'}]">
          <el-input v-model="installParam.repeatPassword" placeholder="Repeat Password" type="password"></el-input>
        </el-form-item>

        <el-form-item :rules="[{min: 1, max: 32, message: '请输入昵称'}]">
          <el-input v-model="installParam.nickname" placeholder="Nickname"></el-input>
        </el-form-item>

        <el-form-item :rules="[{required: true,message: '请输入邮箱'}]">
          <el-input v-model="installParam.email" placeholder="Email"></el-input>
        </el-form-item>

        <el-button type="primary" class="form-submit nep-button-primary" @click="submit">Install</el-button>

      </el-form>
    </div>
  </div>
</template>

<script>
import {installed,install} from "@/api/config"
import {Message} from "element-ui"
import AESUtil from "@/utils/AESUtil";
export default {
  name: "Install",
  data(){
    return {
      installParam: {
        blogName: '',
        username: '',
        password: '',
        repeatPassword: '',
        nickname: '',
        email: ''
      }
    }
  },
  methods: {
    submit(){
      let originPassword = this.installParam.password;
      this.installParam.password = AESUtil.encrypt(originPassword);

      install(this.installParam).then(() => {
        this.$message.success("创建博客成功");
        this.$router.push("/user/login");
      }).catch(error => {
        this.$message.error("创建博客失败： " + error.message)
      }).finally(() => {
        this.installParam.password = originPassword;
      })
    }
  },
  beforeRouteEnter(to,from,next){
    installed().then(status => {
      if(status){
        Message.error("该博客已完成安装");
        next('/');
      } else {
        next();
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.install-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgba(31,45,61,.1);
  padding: 20px 20px;
  width: 360px;
}
</style>
