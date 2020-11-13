<template>
  <div class="grid-item">
    <div class="grid-item-icon">
      <slot name="icon">
        <img src="../../assets/imgs/QQ图片20201110135305.jpg" alt="icon">
      </slot>
    </div>
    <div class="grid-item-title">
      <slot name="title"></slot>
    </div>
    <div class="grid-item-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    content: String
  }
}
</script>

<style lang="scss" scoped>
.grid-item{
  max-width: 320px;
  display: grid;
  grid-template-areas:
    "icon icon title"
    "icon icon content";
  grid-template-columns: 50px 50px 1fr;
  grid-template-rows: 1fr 3fr;

  i.fa{
    grid-area: icon;
    font-size: 100px;
    color: var(--primary-color)
  }

  .grid-item-title{
    grid-area: title;
    font-size: 18px;
  }

  .grid-item-content{
    grid-area: content;
    color: var(--text-color-gray);
    overflow-wrap: anywhere;

  }

  .grid-item-icon{
    grid-area: icon;
    width:100%;

    img{
      width: 100%;
      //border-radius: 50%;
    }
  }
}
</style>
