<template>
  <div>
    <h2 class="sharp-header">文章管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane :label="`所有文章(${allArticleCount})`" name="all" :query="{deleted: false}"></el-tab-pane>
      <el-tab-pane :label="`已发布(${count.published})`" name="published" :query="{status: 4,deleted: false}"></el-tab-pane>
      <el-tab-pane :label="`草稿(${count.draft})`" name="draft" :query="{status: 0,deleted: false}"></el-tab-pane>
      <el-tab-pane :label="`回收站(${count.deleted})`" name="deleted" :query="{deleted: true}"></el-tab-pane>
    </el-tabs>
    <query-group>
        <el-form-item size="small">
          <el-input style="width: 230px" type="text" v-model="query.content" placeholder="输入文章标题或内容搜索"></el-input>
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
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
    </query-group>
    <crud-operation crud="c" @create="createNewArticle"></crud-operation>
    <section>
      <ul>
        <li class="article-list-item"
            v-for="article in articles"
            :key="article.id" >
          <article-card :article="article" mode="edit"></article-card>
          <el-dropdown class="operation-menu">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!article.deleted">
                <router-link :to="`article/${article.id}`">
                  <span>
                    <i class="fa fa-pencil"> Edit</i>
                  </span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="updateTrashBin(article.id, !article.deleted)">
                  <i class="fa"
                     :class="article.deleted ? 'fa-undo' : 'fa-trash'"> {{article.deleted ? 'Restore' : 'Delete'}}</i>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ArticleCard from "@/components/article/ArticleCard";
import CrudOperation from "@/components/form/CrudOperation";
import {privateQueryBy,updateDeleted} from "@/api/article";
import {getAllCategories} from "@/api/category";
import QueryGroup from "@/components/form/QueryGroup";

export default {
  name: "index",
  components: {
    QueryGroup,
    CrudOperation,
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
        deleted: false,
      },
      articles: [],
      count: {
        published: '--',
        draft: '--',
        deleted: '--'
      },
    }
  },
  mounted() {
    this.refresh();
    getAllCategories().then(data => {
      this.availableCategories = data;
    })
  },
  methods: {
    changeSection(tab){
      this.query = tab.$attrs.query;
      this.refresh();
    },
    updateTrashBin(id,deleted){
      updateDeleted({id: id, deleted: deleted}).then(res => {
        if(res){
          this.$message.success(deleted ? "文章已放入回收站" : '文章已恢复')
        }
        this.refresh();
      })
    },
    refresh(){
      privateQueryBy(this.query).then(data => {
        this.articles = data.articles;
        this.count = data.count;
      });
    },
    createNewArticle(){
      this.$router.push('/pluto/article/new')
    }
  },
  computed: {
    allArticleCount(){
      return Number.isInteger(this.count.published)
          ? this.count.published + this.count.draft + this.count.deleted
          : '--'
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
  }
}

</style>
