<template>
  <section class="crud-section nep-operation">
    <el-button type="success"
               v-if="showOperation('c')"
               @click="onAction('create')">Create</el-button>
    <el-button type="warning"
               v-if="showOperation('r')"
               @click="onAction('retrieve')">Retrieve</el-button>
    <el-button type="primary"
               v-if="showOperation('u')"
               @click="onAction('update')">Update</el-button>
    <el-button type="danger"
               v-if="showOperation('d')"
               @click="onAction('delete')">Delete</el-button>
  </section>
</template>

<script>
export default {
  name: "CrudOperation",
  props: {
    crud: {
      type: String,
      default: 'curd'
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
    padding: 6px 10px;
    line-height: 1;
    font-size: 13px;
  }
}
</style>
