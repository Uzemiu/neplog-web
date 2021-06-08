<template>
  <div class="search-page">
    <responsive class="search-item">
      <input v-model="query.content"
             @keydown.enter="search"
             class="search-input"
             type="text"/>
      <el-button v-if="query.content.length > 0"
                 @click="query.content=''"
                 class="clear-button"
                 type="text"><i class="el-icon-close"></i></el-button>
      <el-button @click="search"
                 class="search-button"
                 type="text"><i class="fa fa-search"></i></el-button>
    </responsive>
    <responsive class="article-list-container" v-loading="loading">
      <article-list :articles="articles" mode="list"></article-list>
      <p v-if="loaded && noMoreArticle" class="no-more">没有更多文章了...</p>
      <el-pagination
        style="display: flex;justify-content: center"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :pager-count="5"
        :page-size="query.size"
        :current-page="query.page+1"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </responsive>
  </div>
</template>

<script>
import Responsive from "@/components/layout/Responsive";
import ArticleList from "@/components/article/ArticleList";
import {queryArticleBy} from "@/api/article";
export default {
  name: "SearchPage",
  components: {ArticleList, Responsive},
  data(){
    return {
      loaded: false,
      query:{
        content: '',
        size: 10,
        page: 0,
      },
      total: 0,
      articles: [],
      loading: false,
    }
  },
  methods:{
    search(){
      this.loading = true;
      queryArticleBy(this.query).then(data => {
        this.loaded = true;
        this.articles = data.content;
        this.total = data.total;
      }).catch(() => {}).finally(() => {this.loading = false;})
    },
    handleCurrentChange(val){
      this.query.page = val - 1;
      this.search();
    }
  },
  computed: {
    noMoreArticle(){
      return this.query.size * this.query.page + this.articles.length === this.total
    }
  },
  activated() {
    this.$store.commit('setTransparentHeader', false);
  },
  deactivated() {
    this.$store.commit('setTransparentHeader', true)
  }
}
</script>

<style lang="scss" scoped>
.search-page{
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-item{
    display: flex;
    padding: 0 30px;
    margin-top: 50px;
    height: 50px;
    border-radius: 25px;
    transition: .4s;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07);

    &:hover{
      box-shadow: 0 15px 35px rgba(10,105,170,.1), 0 5px 15px rgba(10,105,170,.1);
    }
    &:hover .clear-button{
      visibility: visible;
    }
  }

  .search-input{
    display: inline-block;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 0 5px;
    font-size: 16px;
  }
  .search-button, .clear-button{
    margin-left: 25px;
    padding: 0;
  }
  .clear-button{
    visibility: hidden;
    color: #888
  }

  .article-list-container{
    margin-top: 48px;
  }

  .no-more{
    width: 100%;
    text-align: center;
    color: #999;
    font-size: 14px;
    margin-bottom: 8px;
  }
}
</style>
