<template>
  <div class="pluto-setting">
    <h2 class="sharp-header">{{title}}</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.name"></el-tab-pane>
    </el-tabs>

    <div class="icon-wrapper">
      <i class="loading-icon"
         :class="iconClass"
         :style="{color: iconColor}"></i>
    </div>

    <component
        :is="components[activeSection]"
        @beforeUpdate="loadingIcon"
        @afterUpdate="updateIcon">
    </component>

  </div>
</template>

<script>

export default {
  name: "Setting",
  props: {
    components: {
      type: Object,
      required: true,
    },
    tabs: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '设置'
    },
    default: String
  },
  data() {
    return {
      activeSection: this.$route.query.section || 'blog',
      iconClass: 'el-icon-check',
      iconColor: '#5daf34',
    }
  },
  mounted() {
    this.activeSection = this.default || this.tabs[0].name;
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
.pluto-setting{
  position: relative;
  max-width: 100%;

  ::v-deep {
    .el-collapse-item__header{
      font-size: 15px;
    }
    .el-form-item__label {
      text-align: right;
      font-size: 15px;
    }
    .el-tabs__item{
      font-size: 16px;
    }
  }

  @media (max-width: 576px) {
    ::v-deep {
      .el-form-item__label {
        padding-bottom: 0;
      }
    }
  }

  .icon-wrapper{
    position: relative;
    margin-bottom: 3px;
  }
  .loading-icon{
    position: absolute;
    right: 0;
    top: -14px;
    z-index: 20;
    font-weight: 600;
  }
}
</style>
