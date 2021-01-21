<template>
  <div class="pluto">
    <section class="pluto-content breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="'/pluto'">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="'/pluto'">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="pluto-content">
      <transition :name="'slide-right'">
        <router-view></router-view>
      </transition>
    </section>
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
  padding-top: 53px;
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
  position: relative;
}
.pluto-view{
  position: absolute;
}

@media (min-width: 993px){
  @import "src/assets/css/transition";
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
