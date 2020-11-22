<template>
  <div class="comment-container">
    <slot name="user-avatar"></slot>
    <div class="comment-main">
      <slot name="main"></slot>
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 20px;

  .comment-main{
    width: 100%;
    position: relative;

  }
}

@media (max-width: 762px){
  .comment-container{
    padding-left: 10px;
  }
}
</style>
