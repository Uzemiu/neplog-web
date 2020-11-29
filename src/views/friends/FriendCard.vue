<template>
  <a class="friend-card" target="_blank" :href="link">
    <img v-lazy="avatar" class="avatar" alt="">
    <h4 class="name">{{name}}</h4>
    <span class="intro">{{intro}}</span>
  </a>
</template>

<script>
  export default {
    name: "FriendCard",
    props: {
      avatar: {
        type: String,
        default: require('@/assets/imgs/tomorinao.jpg')
      },
      name: {
        type: String,
        required: true,
      },
      intro: {
        type: String
      },
      link: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .friend-card {
    display: inline-block;
    width: 100%;
    height: 110px;
    border: 1px solid var(--tertiary-blue);
    border-radius: 10px;
    padding: 15px 20px 15px 20px;
    transition: .3s;

    .avatar{
      float: left;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid #ddd;
      padding: 2px;
      margin-right: 10px;
    }
    .name{
      color: var(--secondary-blue);
      padding: 5px 0;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;

      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        background-color: var(--tertiary-blue);
        height: 1px;
        width: 100%;
      }
    }
    .intro{
      padding-top: 5px;
      color: #2e2e2e;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 170px;
    }
    &:hover{
      border-color: var(--primary-blue);
    }
  }
</style>
