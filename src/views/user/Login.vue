<template>
  <div class="login-section">
    <h2>{{register ? 'Register' : 'Login'}}</h2>
    <el-form :model="user" class="login-form">

      <el-form-item :rules="[{required: true, message: '请输入用户名'}]">
        <el-input v-model="user.username" placeholder="Username"></el-input>
      </el-form-item>

      <el-form-item :rules="[{required: true,message: '请输入密码'}]">
        <el-input v-model="user.password" placeholder="Password" type="password"></el-input>
      </el-form-item>

      <el-form-item :rules="[{required: true,message: '请输入密码'}]" v-if="register">
        <el-input v-model="user.repeatPassword" placeholder="Repeat Password" type="password"></el-input>
      </el-form-item>

      <el-form-item :rules="[{required: true,message: '请输入验证码'}]">
          <el-input v-model="user.captcha" placeholder="验证码" class="captcha-input"></el-input>
          <img src="../../assets/imgs/captcha.png" alt="captcha" class="captcha">
      </el-form-item>

      <el-form-item :rules="[{required: true,message: '请输入邮箱'}]" v-if="register">
        <el-input v-model="user.email" placeholder="Email" class="email-input"></el-input>
        <el-button type="info" class="email-send" plain>Send</el-button>
      </el-form-item>

      <el-form-item :rules="[{required: true,message: '邮箱验证码不能为空'}]" v-if="register">
        <el-input v-model="user.emailCode" placeholder="邮箱验证码"></el-input>
      </el-form-item>

      <el-button type="primary" class="form-submit" @click="submit">{{register ? '注册' : '登录'}}</el-button>

    </el-form>

    <div class="form-foot">
      <router-link :to="register ? 'login' : 'register'">{{register ? '返回登录' : '前往注册'}}</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    register: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      user: {
        username: '',
        password: '',
        repeatPassword: '',
        captcha: '',
        code: '',
        email: '',
        emailCode: ''
      }
    }
  },
  methods: {
    submit(){

    }
  }
}
</script>

<style lang="scss" scoped>

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgba(31,45,61,.1);
  padding: 20px 20px;
  width: 360px;

  .login-form{
    margin-top: 20px;
  }
  .captcha-input{
    width: 60%;
  }
  .captcha{
    height: 36px;
    float: right;
  }
  .email-input{
    width: 72%;
  }
  .email-send{
    line-height: 1;
    height: 36px;
    float: right;
    background-color: #fff;
    &:focus{
      color: #8b8b8b;
      border-color: #d3d4d6;
      background-color: #fff;
    }
    &:hover{
      color: #8b8b8b;
      border-color: #d3d4d6;
      background-color: #f4f4f5;
    }
  }
  .form-submit{
    width: 100%;
    margin-bottom: 12px;
  }

  .form-foot{
    width: 100%;
    text-align: right;
    a{
      color: #8b8b8b;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
