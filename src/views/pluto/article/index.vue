<template>
  <div>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="所有文章" name="all"></el-tab-pane>
      <el-tab-pane label="回收站" name="deleted"></el-tab-pane>
    </el-tabs>
    <section>
      <query>
        <el-form-item>
          <input type="text">
        </el-form-item>
        <el-form-item>
          <input type="text">
        </el-form-item>
      </query>
    </section>
    <section>
      <ul>
        <li class="article-list-item" v-for="article in articles" :key="article.id" >
          <article-card :article="article" mode="edit"></article-card>
          <div class="operation-menu">dsd</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Query from "@/components/query/index"
import ArticleCard from "@/components/article-card/ArticleCard";
export default {
  name: "index",
  components: {
    ArticleCard,
    Query
  },
  data(){
    return {
      activeSection: 'all',
      filter: {

      },
      articles: [{
        id: 1,
        cover: require("@/assets/imgs/71767472_p0.jpg"),
        title: 'TEST',
        createDate: '2077',
        view: 0,
        comment: 0,
        like: 0,
        summary: 'SUMMARYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
        tags: []
      },{
        id: 2,
        cover: require("@/assets/imgs/71773962_p0.jpg"),
        title: '12',
        createDate: '2077',
        view: 0,
        comment: 0,
        like: 0,
        summary: '这是SUMMARY测试',
        tags: []
      }]
    }
  },
  methods: {
    changeSection(tab){
      console.log(tab.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-item{
  position: relative;
  padding: 5px 0;
  .operation-menu{
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
