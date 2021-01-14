<template>
  <section class="search-section">
    <el-form :model="model" class="query-group">
      <slot></slot>
      <div class="action-item">
        <el-form-item size="small">
          <el-button
            class="nep-button-primary inline-button"
            @click="$emit('search',model)">搜索</el-button>
        </el-form-item>
        <el-form-item size="small">
          <el-button
            class="nep-button-primary inline-button"
            @click="$emit('reset',model)">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "QueryGroup",
  props: {
    model: Object
  }
}
</script>

<style lang="scss" scoped>
.search-section{
  position: relative;
}
.query-group{
  display: flex;
  overflow-x: auto;
  flex-wrap: wrap;
  width: 100%;
  ::v-deep .el-form-item{
    padding: 0 5px;
    margin-bottom: 10px;
  }
  .action-item{
    display: flex;
  }
  .inline-button{
    padding: 8px 20px;
    font-size: 14px;
    line-height: 16px;
  }
}
@media (max-width: 576px) {
  .query-group{
    padding-right: 100px;
    flex-wrap: nowrap;
    margin-bottom: 40px;
  }
  .action-item{
    position: absolute;
    left: 0;
    top: 44px;
  }
}
</style>
