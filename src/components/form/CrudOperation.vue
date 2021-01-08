<template>
  <section class="crud-section nep-operation">
    <slot></slot>
    <el-button type="success"
               v-if="showOperation('c')"
               :disabled="multiSelect"
               @click="onAction('create')">新建</el-button>
    <el-button type="warning"
               v-if="showOperation('r')"
               @click="onAction('retrieve')">查找</el-button>
    <el-button type="primary"
               v-if="showOperation('u')"
               @click="onAction('update')">更新</el-button>
    <el-button type="danger"
               v-if="showOperation('d')"
               @click="onAction('delete')">删除</el-button>
  </section>
</template>

<script>
export default {
  name: "CrudOperation",
  props: {
    crud: {
      type: String,
      default: 'curd'
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showOperation(op){
      return this.crud.includes(op);
    },
    onAction(action){
      this.$emit(action);
    }
  }
}
</script>

<style lang="scss" scoped>
.crud-section{
  padding: 3px 5px;
  button{
    padding: 8px 16px;
    line-height: 1;
    font-size: 14px;
  }
}
</style>
