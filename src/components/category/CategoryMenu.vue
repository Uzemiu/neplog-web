<template>
  <div class="category-menu">

    <div v-if="editable" class="create-category">
      <el-input size="small" v-model="newCategory.name"></el-input>
      <el-button type="primary" size="small" @click="createCategory">新建</el-button>
    </div>

    <el-tree
      :data="categories"
      node-key="tid"
      :props="props"
      :load="loadCategory"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-drop="handleCategoryDrop"
      highlight-current
      lazy
      :draggable="editable">
      <span class="menu-label" slot-scope="{node, data}" >
        <router-link
          v-if="!data.isCategory"
          :to="`/article/${data.id}`"
          target="_blank">
          <span :class="labelClass(data)">{{node.label}}</span>
        </router-link>
        <template v-else >
          <span :class="labelClass(data)"> {{node.label}}</span>
          <span class="category-article-count">({{data.articleCount}})</span>
        </template>

        <span v-if="editable && data.isCategory && data.id" class="category-edit" >
          <el-button
            class="category-edit-button"
            type="text"
            size="small"
            @click="editCategory(data, $event)">
            <i class="fa fa-pencil"></i>
          </el-button>
          <el-button
            class="category-edit-button"
            type="text"
            size="small"
            @click="deleteCategory(data, $event)">
            <i class="fa fa-trash"></i>
          </el-button>
        </span>

        <span v-if="!data.isCategory" class="article-date">
          {{data.createTime}}
        </span>

      </span>
    </el-tree>
  </div>
</template>

<script>
import {queryBy as categoryQueryBy, updateCategory, createCategory, deleteCategory} from "@/api/category"
import {
  queryBy as articleQueryBy,
  updateCategory as updateArticleCategory
} from "@/api/article"

export default {
  name: "CategoryMenu",
  props:{
    loadArticles: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
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
      newCategory:{
        id: null,
        name: ''
      }
    }
  },
  methods: {
    handleCategoryDrop(draggingNode, dropNode, type){
      if(draggingNode.data.isCategory){
        // 拽托分类
        let cdata = draggingNode.data;
        if(type === 'inner'){
          let tdata = dropNode.data;
          cdata.parentId = tdata.id;
        } else {
          if(dropNode.level === 1){ // is root
            cdata.parentId = null;
          } else {
            let tdata = dropNode.parent.data;
            cdata.parentId = tdata.id;
          }
        }

        updateCategory(cdata).then(() => {
          this.$message.success('更新分类成功')
        }).catch(() => {})
      } else {
        // 拽托文章
        let adata = draggingNode.data;
        let cateId = null;
        if(type === 'inner'){
          cateId = dropNode.data.id;
        } else if(dropNode.level !== 1){
          cateId = dropNode.parent.data.id;
        }
        adata.category = cateId ? {id:cateId} : null;
        updateArticleCategory(adata).then(() => {
          this.$message.success('更新文章成功')
        }).catch(() => {})
      }
    },
    createCategory(){
      if(!this.newCategory.name){
        return;
      }
      createCategory(this.newCategory).then(data => {
        this.$message.success('新建分类成功');

        data.isCategory = true;
        data.tid = 'c' + data.id;
        this.categories.splice(0,0,data);
        this.newCategory.name = '';
      }).catch(() => {})
    },
    editCategory(data, event){
      event.stopPropagation();

      this.$prompt('',{
        title: '修改分类名',
        customClass: 'responsive',
        inputValue: data.name
      }).then(({value}) => {
        if(value !== data.name){
          updateCategory({
            id: data.id,
            name: value,
            parentId: data.parentId
          }).then(() => {
            this.$message.success('修改分类成功');
            data.name = value;
          }).catch(() => {})
        }
      }).catch(() => {})
    },
    deleteCategory(data, event){
      event.stopPropagation();

      this.$confirm(`确认删除分类${data.name}吗?`,{
        title: '删除分类',
        type: 'warning',
        customClass: 'responsive'
      }).then(() => {
        return deleteCategory(data.id);
      }).then(() => {
        this.$message.success('删除分类成功')
        this.refresh();
      }).catch(() => {})
    },
    allowDrop(draggingNode, dropNode, type){
      return dropNode.data.isCategory && dropNode.data.id;
    },
    allowDrag(node){
      return node.data.id;
    },
    labelClass(data){
      if(data.isSpecCate){
        return 'label-spec-category'
      } else if(data.isCategory){
        return 'label-category'
      } else {
        return 'label-article'
      }
    },
    loadCategory(node, resolve){
      let data = node.data;
      if(data.id === null && this.loadArticles){
        // load uncategorized articles
        articleQueryBy({
          categoryId: [0],
          deleted:false
        }).then(articles => {
          resolve(articles.content);
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
            if(pid === 0 && this.loadArticles){
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
                articles = articles.content;
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
      this.loadByParentId(0).then(data => {
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

  ::v-deep .el-tree-node__content{
    padding: 8px 0;
    height: 40px;
  }

  .menu-label{
    width: 100%;
    position: relative;
    font-size: 16px;
  }

  .menu-label:hover .category-edit{
    display: inline;
  }
  .category-edit{
    display: none;
  }
  ::v-deep .el-tree-node__label{
    //font-size: 1.25em;
  }

  .create-category{
    display: flex;
    margin-bottom: 14px;

    input{
      width: 100%;
    }
    button{
      width: 80px;
      margin-left: 10px;
      line-height: 1;
    }
  }

  .label-spec-category{
    font-weight: 600;
    color: var(--text-color-light-gray);

    & + .category-article-count{
      color: var(--text-color-light-gray);
    }
  }
  .label-category{
    font-weight: 600;
  }
  .label-article{
    color: var(--vscode-keyword);
  }
  .category-article-count{
    padding-left: 10px;
    font-size: 16px;
    color: var(--text-color-gray);
  }
  .category-edit-button{
    margin: 0;
    padding: 6px 3px 6px 12px;
  }
  .article-date{
    position: absolute;
    right: 10px;
    color: var(--vscode-keyword);
  }

}

</style>
