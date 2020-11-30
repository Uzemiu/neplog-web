<template>
  <ul class="sub-menu"><slot></slot></ul>
</template>

<script>
export default {
name: "SubMenu"
}
</script>

<style lang="scss" scoped>
.sub-menu{
  transition: .4s;
  transform: translateY(10px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -10px;
  width: calc(100% + 24px);
  a{
    margin: 0;
  }
  li{
    line-height: 28px;
    text-align: center;
    position: relative;
  }
}
</style>
