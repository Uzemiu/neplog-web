<template>
  <div>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="所有文章" name="all" :query="{deleted: false}"></el-tab-pane>
      <el-tab-pane label="已发布" name="published" :query="{status: 4}"></el-tab-pane>
      <el-tab-pane label="草稿" name="draft" :query="{status: 0}"></el-tab-pane>
      <el-tab-pane label="回收站" name="deleted" :query="{deleted: true}"></el-tab-pane>
    </el-tabs>
    <query-group>
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
                <i class="fa fa-pencil"></i><router-link :to="`article/${article.id}`">Edit</router-link>
              </el-dropdown-item>
<!--              todo  更改drop down item样式-->
              <el-dropdown-item>
                <i class="fa"
                   :class="article.deleted ? 'fa-undo' : 'fa-trash'"
                   @click="updateTrashBin(article.id, !article.deleted)"> {{article.deleted ? 'Restore' : 'Delete'}}</i>
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
import {findArticle,updateDeleted} from "@/api/article";
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
      articles: []
    }
  },
  mounted() {
    this.refresh();
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
      findArticle(this.query).then(data => {
        this.articles = data;
      });
      getAllCategories().then(data => {
        this.availableCategories = data;
      })
    },
    createNewArticle(){
      this.$router.push('/pluto/article/new')
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
