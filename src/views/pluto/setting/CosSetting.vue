<template>
  <el-form
      :model="property"
      label-position="left"
      label-width="85px"
      class="cos-setting">
    <el-collapse v-model="activeSections" class="cos-collapse">

      <el-collapse-item title="腾讯云" name="tencent">
        <el-form-item label="SecretId:">
          <el-input v-model="property.tencent['qc_secretId']"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey:">
          <el-input v-model="property.tencent['qc_secretKey']" type="password"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-input v-model="property.tencent['qc_region']"></el-input>
        </el-form-item>
        <el-form-item label="桶名称:">
          <el-input v-model="property.tencent['qc_bucketName']"></el-input>
        </el-form-item>
        <div class="cos-submit">
          <button type="button" class="nep-button-primary" @click="verify">验证</button>
          <button type="button" class="nep-button-primary" @click="submit('tencent')">提交</button>
        </div>
      </el-collapse-item>

    </el-collapse>
  </el-form>
</template>

<script>
import property from "@/mixins/property";
import {getCosProperty} from "@/api/property";
import {copyProperties} from "@/utils/object";

export default {
  name: "CosSetting",
  data() {
    return {
      property: {
        tencent: {
          'qc_secretId': '',
          'qc_secretKey': '',
          'qc_region': '',
          'qc_bucketName': '',
        }
      },
      activeSections: [],
    }
  },
  mixins: [property],
  mounted() {
    getCosProperty().then(cos => {
      copyProperties(cos,this.property);
    })
  },
  methods: {
    verify(cos){

    },
    submit(cos){
      this.updatePropertyByObject(this.property[cos],false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .cos-setting{

    .cos-submit{
      display: flex;
      justify-content: flex-end;

      button{
        width: 88px;
      }
      button+button{
        margin-left: 10px;
      }
    }
  }
</style>
