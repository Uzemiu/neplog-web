<template>
  <setting
      class="user-setting"
      :components="components"
      :tabs="tabs"
      title="个人信息设置">
  </setting>
</template>

<script>
import Setting from "@/components/setting/index";
import ProfileSetting from "@/views/user/ProfileSetting";
import PasswordSetting from "@/views/user/PasswordSetting";
export default {
  name: "UserSetting",
  components: {Setting},
  data(){
    return {
      components: {
        profile: ProfileSetting,
        password: PasswordSetting
      },
      tabs: [
        {label: '个人信息设置', name: 'profile'},
        {label: '密码设置', name: 'password'},
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.user-setting{
  width: 80%;
  position: relative;
}

@media (max-width: 1024px){
  .user-setting{
    width: 90%;
  }
}

@media (max-width: 768px) {
  .user-setting{
    width: 100%;
    padding: 10px;
  }
}
</style>
