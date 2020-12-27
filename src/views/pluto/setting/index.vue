<template>
  <div class="pluto-setting">
    <h2 class="sharp-header">设置</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="博客" name="blog"></el-tab-pane>
      <el-tab-pane label="封面" name="cover"></el-tab-pane>
      <el-tab-pane label="其他" name="other"></el-tab-pane>
    </el-tabs>

    <i class="loading-icon"
       :class="iconClass"
       :style="{color: iconColor}"></i>
    <component
        :is="activeComponent"
        @beforeUpdate="loadingIcon"
        @afterUpdate="updateIcon">
    </component>

  </div>
</template>

<script>
import {resetProperty} from "@/api/property";
import {userInfo} from "@/api/user";
import BlogSetting from "@/views/pluto/setting/BlogSetting";
import CoverSetting from "@/views/pluto/setting/CoverSetting";

const components = {
  'blog': BlogSetting,
  'cover': CoverSetting
}
export default {
  name: "index",
  data() {
    return {
      activeSection: 'blog',
      test2: 'nihao',
      iconClass: 'el-icon-check',
      iconColor: '#5daf34',
    }
  },
  methods: {
    resetProperty() {
      resetProperty().then(() => {
        this.$message.success("重置博客设置成功")
        this.$store.dispatch('getBlogProperty')
      }, error => {
        this.$message.error("重置博客设置失败: " + error.message)
      })
    },
    test() {
      this.$confirm('test', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log("confirm clicked")
        return userInfo();
      }).then((data) => {
        console.log(data)
        console.log("next ")
      }).catch(() => {
        console.warn("cancel clicked")
      })
    },
    changeSection(tab) {
      this.activeSection = tab.name
    },
    loadingIcon(){
      this.iconClass = 'el-icon-loading'
      this.iconColor = '#8d8d8d'
    },
    updateIcon(status){
      this.iconClass = status ? 'el-icon-check' : 'el-icon-close'
      this.iconColor = status ? '#5daf34' : '#ff434f'
    }
  },
  computed: {
    activeComponent(){
      return components[this.activeSection];
    }
  }
}
</script>

<style lang="scss" scoped>
.pluto-setting{
  position: relative;
  .loading-icon{
    position: absolute;
    right: 10px;
    z-index: 20;
    font-weight: 600;
  }
}
</style>
