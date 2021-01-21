<template>
  <el-form
    :model="property"
    label-position="left"
    label-width="85px"
    class="cos-setting">

    <el-form-item label="默认存储:">
      <el-radio-group
          v-model="property.defaultFileService"
          @change="updatePropertyByKey('defaultFileService')">
        <el-radio label="local">本地</el-radio>
        <el-radio label="tencent" :disabled="availableCosService.indexOf('tencent') < 0">腾讯云</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-collapse v-model="activeSections" class="cos-collapse">

      <el-collapse-item title="腾讯云" name="tencent">
        <el-form-item label="SecretId:">
          <el-input v-model="property.tencent['qc_secretId']" clearable></el-input>
        </el-form-item>
        <el-form-item label="SecretKey:">
          <el-input v-model="property.tencent['qc_secretKey']" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="桶名称:">
          <el-input v-model="property.tencent['qc_bucketName']"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-input v-model="property.tencent['qc_region']"></el-input>
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
import property from "@/mixins/property";
import {getCosProperties, updateCosProperty} from "@/api/cos";
import {getDefaultFileService, listAvailableCosService} from "@/api/property";

export default {
  name: "CosSetting",
  data() {
    return {
      property: {
        defaultFileService: '',
        tencent: {
          'qc_secretId': '',
          'qc_secretKey': '',
          'qc_region': '',
          'qc_bucketName': '',
        }
      },
      availableCosService: [],
      activeSections: [],
    }
  },
  mixins: [property],
  mounted() {
    this.refresh();
  },
  methods: {
    submit(cos) {
      this.loading = true;
      updateCosProperty(cos, this.property[cos]).then(() => {
        this.availableCosService.push(cos);
        this.$message.success("验证成功，配置已保存");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      })
    },
    refresh(){
      listAvailableCosService('availableCosService').then(data => {
        this.availableCosService = data.split(';');
      });
      getDefaultFileService().then(data => {
        this.property.defaultFileService = data;
      })
      getCosProperties().then(cos => {
        Object.assign(this.property, cos);
      });
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
