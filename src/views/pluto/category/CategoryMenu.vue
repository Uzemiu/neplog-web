<template>
  <div class="category-menu">
    <el-tree
      :data="categories"
      node-key="tid"
      :props="props"
      :load="loadCategory"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      highlight-current
      lazy
      draggable>
      <span class="menu-label" slot-scope="{node, data}">
        <span>{{node.label}}</span>
        <span v-if="data.isCategory" class="category-edit">
          <el-button
            type="text"
            size="small"
            @click="editCategory(data)">
            <i class="fa fa-pencil"></i>
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog
      title="修改名称"
      :visible.sync="dialogVisible"
      close-on-click-modal
      width="30%">
      <el-input v-model="editingCategory.newName"></el-input>
      <span slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button @click="completeEdit">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {queryBy as categoryQueryBy,updateCategory} from "@/api/category"
import {queryBy as articleQueryBy} from "@/api/article"

export default {
  name: "CategoryMenu",
  props:{
    loadArticles: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      dialogVisible: false,
      categories:[],
      props:{
        label(data, node){
          return data.isCategory ? data.name : data.title;
        },
        children: 'children',
        isLeaf(data, node){
          return !data.isCategory;
        }
      },
      query: {
        parentId: 0,
        name: ''
      },
      editingCategory:{
        newName: '',
        old: {}
      }
    }
  },
  methods: {
    categoryDrop(draggingNode, dropNode){

    },
    editCategory(data){
      this.editingCategory.newName = data.name;
      this.editingCategory.old = data;
      this.dialogVisible = true;
    },
    completeEdit(){
      updateCategory({
        id: this.editingCategory.old.id,
        name: this.editingCategory.newName
      }).then(() => {
        this.$message.success("更新分类成功")
        this.editingCategory.old.name = this.editingCategory.newName;
        this.dialogVisible = false;
      }).catch(() => {})
    },
    allowDrop(draggingNode, dropNode, type){
      return type === 'inner' && dropNode.data.id;
    },
    allowDrag(node){
      return node.data.id;
    },
    loadCategory(node, resolve){
      let data = node.data;
      if(data.id === null && this.loadArticles){
        // load uncategorized articles
        articleQueryBy({
          categoryId: [0],
          deleted:false
        }).then(articles => {
          resolve(articles);
        });
      } else if(data.isCategory){
        this.loadByParentId(data.id).then(data => {
          resolve(data);
        }).catch(() => {})
      } else {
        resolve([]);
      }
    },
    /**
     * 根据父节点信息加载分类以及文章
     * @param pid /
     */
    loadByParentId(pid){
      return new Promise((resolve, reject) => {
        let res = [];
        categoryQueryBy({
            parentId: pid,
            name: this.query.name
          }).then(cates => {
            cates.forEach(c => {
              c.tid = 'c' + c.id;
              c.isCategory = true;
            });
            res.push(...cates);
            // 添加未分类文章信息
            if(pid === null && this.loadArticles){
              res.push({
                tid: 'cnull',
                id: null,
                isCategory: true,
                isSpecCate: true,
                name: '未分类文章',
              })
            }

            // 加载文章信息
            if(pid && this.loadArticles){
              articleQueryBy({
                categoryId: [pid],
                deleted:false
              }).then(articles => {
                articles.forEach(a => {
                  a.tid = 'a' + a.id;
                  a.isCategory = false;
                });
                res.push(...articles);
                resolve(res);
              }).catch(error => reject(error));
            } else {
              resolve(res);
            }
          })
      })
    },
    refresh(){
      this.loadByParentId(null).then(data => {
        this.categories = data;
      }).catch(() => {})
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.category-menu{
  .menu-label:hover .category-edit{
    display: inline;
  }
  .category-edit{
    display: none;
  }
  ::v-deep .el-tree-node__label{
    font-size: 16px;
  }
}
</style>
