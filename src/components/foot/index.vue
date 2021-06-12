<template>
  <footer class="blog-footer">
    <p>Powered by <a href="https://github.com/Uzemiu/neplog">Neplog</a></p>
    <p class="icp-info">
      <a href="http://beian.miit.gov.cn/" class="icp-link">{{$store.getters.icp}}</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "foot",
}
</script>

<style lang="scss" scoped>
  .blog-footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #666;
    margin-top: 20px;
    padding: 30px 0;
  }
</style>
