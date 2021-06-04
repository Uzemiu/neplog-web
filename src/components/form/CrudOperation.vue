<template>
  <section class="crud-section nep-operation">
    <slot></slot>
    <div class="crud-section-left">
      <el-button type="primary" size="mini"
                 v-if="showOperation('c')"
                 :disabled="createDisabled"
                 @click="$emit('create')">
        <i class="el-icon-plus"></i>
        <span>{{createText}}</span>
      </el-button>
      <el-button type="success" size="mini"
                 v-if="showOperation('u')"
                 :disabled="updateDisabled"
                 @click="$emit('update')">
        <i class="el-icon-edit"></i>
        <span>{{updateText}}</span>
      </el-button>
      <el-button type="warning" size="mini"
                 v-if="showOperation('r')"
                 :disabled="retrieveDisabled"
                 @click="$emit('retrieve')">
        <i class="el-icon-search"></i>
        <span>{{retrieveText}}</span>
      </el-button>
      <el-button type="danger" size="mini"
                 v-if="showOperation('d')"
                 :disabled="deleteDisabled"
                 @click="$emit('delete')">
        <i class="el-icon-delete"></i>
        <span>{{deleteText}}</span>
      </el-button>
    </div>

    <div class="crud-section-right">
      <el-button size="mini" @click="tryRefresh">
        <i class="el-icon-refresh"></i>
      </el-button>
    </div>
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
    },
    createText: {
      type: String,
      default: '新建'
    },
    updateText: {
      type: String,
      default: '更新'
    },
    retrieveText:{
      type: String,
      default: '查找'
    },
    deleteText:{
      type: String,
      default: '删除'
    },
    createDisabled: Boolean,
    updateDisabled: Boolean,
    retrieveDisabled: Boolean,
    deleteDisabled: Boolean,
    refresh: Function
  },
  methods: {
    showOperation(op){
      return this.crud.includes(op);
    },
    tryRefresh(){
      if(this.refresh){
        this.refresh();
      } else {
        if(typeof(this.$parent.refresh) === 'function'){
          this.$parent.refresh();
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.crud-section{
  display: flex;
  padding: 4px 5px;

  .crud-section-right{
    margin-left: auto;
  }
}
</style>
