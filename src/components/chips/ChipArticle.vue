<template>
  <div class="list-wrapper">

    <responsive class="chip-list">
      <slot name="chips"></slot>
    </responsive>

    <responsive v-if="loaded" class="article-list-container">

      <article-list
        :articles="articles"
        :show-arrow="true"
        mode="list">
      </article-list>

      <p v-if="noMoreArticle" class="no-more">没有更多文章了...</p>

      <el-pagination
        style="display: flex;justify-content: center"
        :pager-count="5"
        :page-size="query.size"
        :current-page="query.page+1"
        @current-change="handleCurrentChange"
        hide-on-single-page
        :total="total"
        layout="prev, pager, next">

      </el-pagination>
    </responsive>
  </div>
</template>

<script>
import Responsive from "@/components/layout/Responsive";
import ArticleList from "@/components/article/ArticleList";
import {queryArticleBy} from "@/api/article";
export default {
  name: "ChipArticle",
  components: {ArticleList, Responsive},
  data(){
    return {
      loaded: false,
      loading: false,
      query: {
        size: 10,
        page: 0,
      },
      articles:[],
      total: 0
    }
  },
  methods: {
    listArticles(){
      queryArticleBy(this.query).then(data => {
        this.articles = data.content;
        this.total = data.total;
        this.loaded = true;
      }).catch(() => {})
    },
    handleCurrentChange(val){
      this.query.page = val - 1;
      this.listArticles();
    }
  },
  computed: {
    noMoreArticle(){
      return this.query.size * this.query.page + this.articles.length === this.total
    }
  }
}
</script>

<style lang="scss" scoped>
.chip-list{
  padding: 16px 0;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07);
  margin-bottom: 18px;
}

.list-wrapper{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 10px;
  width: 100%;
}

.no-more{
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
