<template>
  <footer>
      <p class="icp-info">
        <a href="http://beian.miit.gov.cn/" class="icp-link">沪ICP备20004108号</a>
      </p>
  </footer>
</template>

<script>
export default {
  name: "foot",
}
</script>

<style lang="scss" scoped>
  footer{
    background-color: #181818;
    display: grid;
    justify-items: center;
    justify-self: flex-end;

    .icp-info{
      margin: 10px 0;
      color: #fff;
      .icp-link{
        color: #fff;
        font-size: 13px;
      }
    }
  }
</style>
