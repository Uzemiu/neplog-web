<template>
  <div class="about-setting">
    <el-form
      :model="about"
      label-position="left"
      label-width="80px">

      <h4 class="sharp-header">个人介绍：</h4>
      <mavon-editor
        ref=md
        class="editor"
        :tabSize="4"
        :toolbars="toolbars"
        v-model="about.about_description"
        @save="handleSave"
        style="height: 360px;z-index: unset"></mavon-editor>

      <h4 class="sharp-header">社交媒体：</h4>

      <el-form-item
          v-for="key in currentLinks"
          :key="key"
          :label="`${links[key]} :`">
        <el-input
          v-model="about[key]"
          @change="updateAboutProperty(key)"></el-input>
      </el-form-item>

      <el-form-item label="新增链接:">

        <el-select
          v-model="ignore"
          filterable
          @change="addLinks">

          <el-option
            v-for="key of Object.keys(links)"
            :key="key"
            :label="links[key]"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {getAboutProperty, updateProperty} from "@/api/property";

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
        about_description: '',
        about_description_html: '',
      },
      links: {
        about_github: 'Github',
        about_gitee: 'Gitee',
        about_wechat: '微信',
        about_zhihu: '知乎',
        about_jianshu: '简书',
        about_csdn: 'CSDN',
        about_weibo: '微博',
        about_linkedin: '领英',
        about_qq: 'QQ',
        about_bilibili: 'bilibili',
      },
      currentLinks: [],
      ignore:''
    }
  },
  methods: {
    refresh(){
      getAboutProperty().then(data => {
        if(data){
          for(let k of Object.keys(data)){
            if(!k.startsWith('about_description')){
              // 个人介绍description不加入网站链接
              this.currentLinks.push(k)
            }
            this.$set(this.about, k, data[k])
          }
        }
      }).catch(() => {})
    },
    addLinks(key){
      if(this.currentLinks.findIndex(e => e === key) < 0){
        this.currentLinks.push(key)
      }
      this.ignore = '';
    },
    updateAboutProperty(property){
      this.$emit('beforeUpdate');
      let data = property;
      if(typeof property === 'string'){
        data = {[property]: this.about[property]}
      }
      updateProperty(data).then(() => {
        this.$emit('afterUpdate', true);
      }).catch(() => this.$emit('afterUpdate', false))
    },
    handleSave(){
      this.about.about_description_html = this.$refs.md.d_render;
      this.updateAboutProperty({
        'about_description': this.about.about_description,
        'about_description_html': this.about.about_description_html,
      })
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.about-setting{
  h4{
    margin-bottom: 16px;
  }
}
.editor{
  margin: 16px 0;
}
</style>
