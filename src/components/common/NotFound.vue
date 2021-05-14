<template>
  <div class="not-found">
    <img :src="require('@/assets/imgs/sticker/nep404.png')" alt="">
    <slot>
      <p>无法找到此页面...</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "NotFound",
}
</script>

<style lang="scss" scoped>
.not-found{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
