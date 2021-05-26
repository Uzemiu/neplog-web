<template>
  <div>
    <h2 class="sharp-header">文章管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane
        :label="`所有文章(${allArticleCount})`"
        name="all"
        :query="{status: null,deleted: false}"></el-tab-pane>
      <el-tab-pane
        :label="`已发布(${count.published})`"
        name="published"
        :query="{status: 4,deleted: false}"></el-tab-pane>
      <el-tab-pane
        :label="`草稿(${count.draft})`"
        name="draft"
        :query="{status: 0,deleted: false}"></el-tab-pane>
      <el-tab-pane
        :label="`回收站(${count.deleted})`"
        name="deleted"
        :query="{status:null, deleted: true}"></el-tab-pane>
    </el-tabs>
    <query-group @search="refresh">
      <el-form-item size="small">
        <el-input
          style="width: 230px"
          type="text"
          v-model="query.content"
          placeholder="输入文章标题或内容搜索"></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-select
          style="width: 150px;"
          v-model="query.categoryId"
          default-first-option
          placeholder="文章分类">
          <el-option
            v-for="ca in availableCategories"
            :key="ca.id"
            :label="ca.name"
            :value="ca.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small">
        <el-date-picker
          style="width: 240px"
          v-model="query.createTime"
          type="daterange"
          range-separator=":"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </query-group>
    <crud-operation crud="crud" @create="createNewArticle">

    </crud-operation>
    <section>
      <ul>
        <li class="article-list-item"
            v-for="article in articles"
            :key="article.id" >
          <article-card :article="article" mode="edit"></article-card>

          <div class="operation-menu">
            <span>
              <router-link v-if="!article.deleted" :to="`article/${article.id}`">
                <i class="fa fa-pencil"></i>
                编辑
              </router-link>
            </span>
            <span @click="updateTrashBin(article, !article.deleted)">
              <i class="fa" :class="article.deleted ? 'fa-undo' : 'fa-trash'"></i>
              {{article.deleted ? '恢复' : '删除'}}
            </span>
            <span @click="deleteById(article)" v-if="article.deleted" class="delete-operation">
              <i class="fa fa-trash"></i>
              彻底删除
            </span>
          </div>

        </li>
      </ul>
    </section>
    <el-pagination
      style="display: flex;justify-content: center"
      :hide-on-single-page="false"
      @current-change="handleCurrentChange"
      :pager-count="5"
      :page-size="query.size"
      :current-page="query.page+1"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import ArticleCard from "@/components/article/ArticleCard";
import CrudOperation from "@/components/form/CrudOperation";
import {countArticleByLabel, deleteById, queryArticleBy, updateDeleted} from "@/api/article";
import {queryCategoryBy } from "@/api/category";
import QueryGroup from "@/components/form/QueryGroup";
import query from "@/mixins/query";

export default {
  name: "PlutoArticle",
  components: {
    QueryGroup,
    CrudOperation,
    ArticleCard,
  },
  mixins: [query],
  data(){
    return {
      currentPage: 1,
      activeSection: 'all',
      availableCategories: [],
      availableStatus: [{
        value: 0, label: '草稿'
      },{
        value: 4, label: '已发布'
      }],
      query: {
        deleted: false,
        size: 10,
        page: 0,
      },
      articles: [],
      total: 0,
      count: {
        published: '--',
        draft: '--',
        deleted: '--'
      },
    }
  },
  mounted() {
    this.refresh();
    countArticleByLabel().then(count => {
      this.count = count;
    });
    queryCategoryBy().then(data => {
      this.availableCategories = data;
    }).catch(() => {})
  },
  methods: {
    updateTrashBin(article,deleted){
      let requestObj = {id:article.id,deleted:deleted};
      let promise = deleted
        ? this.$confirm(`确定要将${article.title}放入回收站吗`,{
          title: '删除文章',
          customClass: 'responsive'
        }).then(() => {
          return updateDeleted(requestObj);
        })
        : updateDeleted(requestObj);
      promise.then(res => {
        if(res){
          let f = deleted ? -1 : 1;
          if(article.status === 0){
            this.count.draft += f;
          } else {
            this.count.published += f;
          }
          this.count.deleted -= f;
          this.articles.splice(this.articles.findIndex(a=>a.id===article.id),1);
          this.$message.success(deleted ? "文章已放入回收站" : '文章已恢复')
        }
      }).catch(() => {})
    },
    refresh(){
      queryArticleBy(this.query).then(data => {
        this.articles = data.content;
        this.total = data.total
      }).catch(() => {});
    },
    createNewArticle(){
      this.$router.push('/pluto/article/new')
    },
    deleteById(article){
      this.$confirm(`确定要删除${article.title}吗`,{
        title: '彻底删除文章',
        customClass: 'responsive'
      }).then(() => {
        return deleteById(article.id);
      }).then(() => {
        this.articles.splice(this.articles.findIndex(a => a.id === article.id), 1);
        this.$message("删除文章成功")
      }).catch(() => {});
    }
  },
  computed: {
    allArticleCount(){
      return Number.isInteger(this.count.published)
          ? this.count.published + this.count.draft
          : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-item{
  position: relative;
  padding: 5px 0;
  display: flex;
  align-items: center;
  .operation-menu{
    position: absolute;
    right: 20px;
    font-size: 14px;

    span{
      padding-left: 10px;
      cursor: pointer;
      color: #666;
      transition: .3s;
    }
    span a{
      transition: .3s;
    }
    span:hover, span:hover a{
      color: var(--vscode-keyword);
    }
    .delete-operation{
      color: #cd8e8e;
    }
  }
}

</style>
