<template>
  <div class="about-setting">

    <el-form
      :model="about"
      label-position="left"
      label-width="80px">

      <h4 class="sharp-header">个人介绍：</h4>
      <mavon-editor
        ref=md
        :tabSize="4"
        :toolbars="toolbars"
        v-model="about.description"
        style="height: 360px;z-index: unset"></mavon-editor>



    </el-form>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'

export default {
  name: "AboutSetting",
  data(){
    return {
      toolbars:{
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        link: true,
        save: true,
        preview: true,
      },
      about:{
        description: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
