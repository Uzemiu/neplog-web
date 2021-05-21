<template>
  <setting :components="components" :tabs="tabs" title="博客设置"></setting>
</template>

<script>
import BlogSetting from "@/views/pluto/setting/BlogSetting";
import CoverSetting from "@/views/pluto/setting/CoverSetting";
import AboutSetting from "@/views/pluto/setting/AboutSetting";
import CosSetting from "@/views/pluto/setting/CosSetting";
import Setting from "@/components/setting/index";
import MailSetting from "@/views/pluto/setting/MailSetting";

export default {
  name: "PlutoSetting",
  components: {Setting},
  data() {
    return {
      components: {
        'blog': BlogSetting,
        'cover': CoverSetting,
        'cos': CosSetting,
        'mail': MailSetting,
        'about': AboutSetting
      },
      tabs: [
        {label: '博客设置', name:'blog'},
        {label: '封面设置', name:'cover'},
        {label: '关于界面', name:'about'},
        {label: 'COS', name:'cos'},
        {label: '邮件', name:'mail'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
