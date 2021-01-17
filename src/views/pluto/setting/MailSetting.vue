<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="80px"
      class="blog-setting">
    <el-form-item label="主机名:">
      <el-input v-model="property.mail_host"></el-input>
    </el-form-item>
    <el-form-item label="用户名:">
      <el-input v-model="property.mail_username"></el-input>
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="property.mail_password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="端口号:">
      <el-input v-model="property.mail_port"></el-input>
    </el-form-item>
    <el-form-item label="字符编码:">
      <el-input v-model="property.mail_charset"></el-input>
    </el-form-item>
    <el-form-item label="协议:">
      <el-input v-model="property.mail_protocol"></el-input>
    </el-form-item>
    <el-form-item label="发信人:">
      <el-input v-model="property.mail_from"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
          type="primary"
          class="nep-button-primary"
          style="line-height: 23px;width: 120px"
          :loading="loading"
          @click="updateMailProperties">更新配置</el-button>
      <el-button
          type="primary"
          class="nep-button-primary"
          style="line-height: 23px;width: 120px"
          :loading="loading"
          @click="testConnection">TEST</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import property from "@/mixins/property";
import {getMailProperty, testConnection} from "@/api/property";

export default {
  name: "MailSetting",
  data(){
    return {
      property: {
        'mail_host': '',
        'mail_username': '',
        'mail_password': '',
        'mail_port': '',
        'mail_encoding': '',
        'mail_protocol': '',
        'mail_from': '',
      },
    }
  },
  mixins: [property],
  mounted() {
    getMailProperty().then(data => {
      this.property = data;
    })
  },
  methods: {
    updateMailProperties(){
      this.updatePropertyByObject(this.property).then(() => {

      })
    },
    testConnection(){
      testConnection()
    }
  }
}
</script>

<style scoped>

</style>
