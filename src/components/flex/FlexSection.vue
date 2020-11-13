<template>
  <section class="flex-section">
    <slot name="title"></slot>
    <slot name="intro"></slot>
    <slot name="items"></slot>
  </section>
</template>

<script>
export default {
  name: "FlexSection"
}
</script>

<style lang="scss" scoped>
.flex-section{
  display: grid;
  justify-items: center;
  max-width: 1180px;
  padding: 0 80px;

  .main-title{
    font-size: 34px;
    color: var(--text-color-darker);

    &::after{
      content: "";
      display: block;
      width: 80%;
      height: 4px;
      background-color: var(--primary-color);
      margin-top: 10px;
      transform: translateX(10%);
    }
  }

  .intro{
    margin: 28px 0 60px 0;
    font-size: 18px;
    color: var(--text-color-darker);
  }
}

</style>
