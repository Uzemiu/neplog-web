<template>
  <div>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="所有文章" name="all"></el-tab-pane>
      <el-tab-pane label="回收站" name="deleted"></el-tab-pane>
    </el-tabs>
    <section class="search-section">
      <el-form :model="query" class="query-group">
        <el-form-item size="small">
          <el-input style="width: 160px" type="text" v-model="query.title" placeholder="输入标题搜索"></el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-input style="width: 200px" type="text" v-model="query.content" placeholder="输入文章内容搜索"></el-input>
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
          <el-select
              style="width: 110px;"
              v-model="query.status"
              default-first-option
              placeholder="文章状态">
            <el-option
                v-for="status in availableStatus"
                :key="status.value"
                :label="status.label"
                :value="status.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small">
          <el-date-picker
              style="width: 240px"
              v-model="query.createTime[0]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div class="action-item">
          <el-form-item size="small">
            <el-button class="nep-button-primary inline-button">Search</el-button>
          </el-form-item>
          <el-form-item size="small">
            <el-button class="nep-button-primary inline-button">Reset</el-button>
          </el-form-item>
        </div>
      </el-form>
    </section>
    <section>
      <ul>
        <li class="article-list-item"
            v-for="article in articles"
            :key="article.id" >
          <article-card :article="article" mode="edit"></article-card>
          <div class="operation-menu">dsd</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ArticleCard from "@/components/article-card/ArticleCard";
import {findArticle} from "@/api/article";
import {getAllCategories} from "@/api/category";

export default {
  name: "index",
  components: {
    ArticleCard,
  },
  data(){
    return {
      activeSection: 'all',
      availableCategories: [],
      availableStatus: [{
        value: 0, label: '草稿'
      },{
        value: 4, label: '已发布'
      }],
      query: {
        title: null,
        content: null,
        status: null,
        createTime: [null,null],
        updateTime: [null,null],
        categoryId: null
      },
      articles: []
    }
  },
  mounted() {
    findArticle().then(data => {
      this.articles = data;
    });
    getAllCategories().then(data => {
      this.availableCategories = data;
    })
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
.search-section{
  position: relative;
}
.query-group{
  display: flex;
  overflow-x: auto;
  flex-wrap: wrap;
  width: 100%;
  .el-form-item{
    padding: 0 5px;
    margin-bottom: 10px;
  }
  .action-item{
    display: flex;
  }
  .inline-button{
    padding: 8px 10px;
    font-size: 14px;
    line-height: 1;
  }
}
@media (max-width: 768px) {
  .query-group{
    padding-right: 100px;
    flex-wrap: nowrap;
    width: calc(100% - 150px);
  }
  .action-item{
    position: absolute;
    right: 0;
  }
}
</style>
