<template>
  <setting :components="components" :tabs="tabs" title="博客设置"></setting>
</template>

<script>
import BlogSetting from "@/views/pluto/setting/BlogSetting";
import CoverSetting from "@/views/pluto/setting/CoverSetting";
import OtherSetting from "@/views/pluto/setting/OtherSetting";
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
        'other': OtherSetting
      },
      tabs: [
        {label: '博客设置', name:'blog'},
        {label: '封面设置', name:'cover'},
        {label: 'COS', name:'cos'},
        {label: '邮件', name:'mail'},
        {label: '其他设置', name:'other'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
