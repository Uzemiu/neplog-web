<template>
  <div class="pluto">
    <section class="pluto-content breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="'/pluto'">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="'/pluto'">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <router-view class="pluto-content"></router-view>
  </div>
</template>

<script>
export default {
  name: "Pluto",
}
</script>

<style lang="scss" scoped>
.pluto{
  width: 100%;
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.breadcrumb{
  height: 50px;
  display: flex;
  align-items: center;
}
.pluto-content{
  width: 80%;
}

@media (max-width: 1024px){
  .pluto-content{
    width: 90%;
  }
}

@media (max-width: 768px) {
  .pluto-content{
    width: 100%;
    padding: 10px;
  }
}

</style>
