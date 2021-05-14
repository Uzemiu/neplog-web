<template>
  <div class="under-construction">
    <img :src="require('@/assets/imgs/sticker/nep-contruction.png')" alt="">
    <p>{{dd}}</p>
  </div>
</template>

<script>
export default {
  name: "UnderConstruction",
  props: {
    dd: {
      type: String,
      default: '此页面正在施工...'
    }
  }
}
</script>

<style lang="scss" scoped>
.under-construction{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
