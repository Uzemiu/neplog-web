<template>
  <el-tree
    :data="categories"
    node-key="id"
    :props="props"
    :load="loadCategory"
    lazy
    draggable>

  </el-tree>
</template>

<script>
import {categoryQueryBy} from "@/api/category"
import {articleQueryBy} from "@/api/article"

export default {
  name: "CategoryMenu",
  data(){
    return {
      categories:[],
      props:{
        label(data, node){
          //console.log(data, node)
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
      }
    }
  },
  methods: {

    loadCategory(node, resolve){
      let data = node.data;
      if(data.isCategory){
        categoryQueryBy({parentId: data.id}).then(data => {
          data.forEach(c => c.isCategory = true);
          resolve(data);
        }).catch(() => {})
      }
    },
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
          res.push(cates);
          return articleQueryBy({categoryId: [pid]});
        }).then(articles => {
          articles.forEach(a => {
            a.tid = 'a' + a.id;
            a.isCategory = false;
          });
          res.push(articles);
          resolve(res);
        }).catch(error => reject(error))
      })
    },
    refresh(){
      categoryQueryBy(this.query).then(data => {
        this.categories = data;
        this.categories.forEach(c => c.isCategory = true)
      }).catch(() => {})
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>

</style>
