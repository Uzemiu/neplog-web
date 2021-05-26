<template>
  <section class="search-section">
    <el-form :model="model" class="query-group">
      <slot></slot>
        <el-form-item size="mini">
          <el-button
            type="success"
            @click="$emit('search',model)">
            <i class="el-icon-search"></i>
            <span>搜索</span>
          </el-button>
        </el-form-item>
        <el-form-item size="mini">
          <el-button
            type="warning"
            @click="$emit('reset',model)">
            <i class="el-icon-refresh-left"></i>
            <span>重置</span>
          </el-button>
        </el-form-item>
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
  .inline-button{
    padding: 8px 20px;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
