<template>
  <div class="comment-container">
    <div class="user-avatar">
      <slot name="user"></slot>
    </div>
    <div class="comment-main">
      <slot name="main-before"></slot>
      <slot name="input"></slot>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {

  }
}
</script>

<style lang="scss" scoped>
.comment-container{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  .user-avatar{
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .comment-main{
    width: 100%;
    position: relative;
  }
}
</style>
