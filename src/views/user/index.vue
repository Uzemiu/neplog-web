<template>
  <div class="user-section">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style lang="scss" scoped>
.user-section{
  width: 100%;
  height: 100%;
  padding-top: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
