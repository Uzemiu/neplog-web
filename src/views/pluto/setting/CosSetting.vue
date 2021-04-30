<template>
  <el-form
    :model="config"
    label-position="left"
    label-width="85px"
    class="cos-setting">

    <el-form-item label="默认存储:">
      <el-radio-group
          v-model="config.defaultFileService"
          @change="updateConfigByKey('defaultFileService', 'blog')">
        <el-radio label="local">本地</el-radio>
        <el-radio label="tencent" :disabled="availableFileService.indexOf('tencent') < 0">腾讯云</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-collapse v-model="activeSections" class="cos-collapse">

      <el-collapse-item title="腾讯云" name="tencent">
        <el-form-item label="SecretId:">
          <el-input v-model="config.tencent['secretId']" clearable></el-input>
        </el-form-item>
        <el-form-item label="SecretKey:">
          <el-input v-model="config.tencent['secretKey']" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="桶名称:">
          <el-input v-model="config.tencent['bucketName']"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-input v-model="config.tencent['region']"></el-input>
        </el-form-item>

        <div class="cos-submit">
          <el-button
            type="button"
            class="nep-button-primary"
            @click="submit('tencent')"
            :loading="loading">
            提交
          </el-button>
        </div>
      </el-collapse-item>

    </el-collapse>
  </el-form>
</template>

<script>
import config from "@/mixins/config";
import {getConfig, updateConfig} from "@/api/config";

export default {
  name: "CosSetting",
  data() {
    return {
      config: {
        tencent: {
          'secretId': '',
          'secretKey': '',
          'region': '',
          'bucketName': '',
        },
        defaultFileService: '',
      },
      availableFileService: [],
      activeSections: [],
    }
  },
  mixins: [config],
  mounted() {
    this.refresh();
  },
  methods: {
    submit(cos) {
      this.loading = true;
      updateConfig('tencent', this.config[cos]).then(() => {
        this.availableFileService.push(cos);
        this.$message.success("验证成功，配置已保存");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      })
    },
    refresh(){
      getConfig('blog').then(data => {
        this.availableFileService = data.availableFileService.split(';');
        this.config.defaultFileService = data.defaultFileService || 'local';
      })
      getConfig('tencent').then(data => {
        this.config.tencent = data;
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.cos-setting {

  .cos-submit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    button {
      width: 88px;
      line-height: 23px;
    }

    button + button {
      margin-left: 10px;
    }
  }
}
</style>
