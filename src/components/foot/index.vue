<template>
  <footer>
    <p>Powered by <a href="https://github.com/">Neplog</a></p>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #666;
    margin-top: 20px;
  }
</style>
