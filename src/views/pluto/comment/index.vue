<template>
  <div class="pluto-comment">
    <h2 class="sharp-header">评论管理</h2>
    <query-group @search="refresh">
      <el-form-item size="small">
        <el-input
          v-model="query.content"
          style="width: 240px"
          placeholder="输入评论内容搜索"></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-select
          v-model="query.articleId"
          filterable
          clearable
          placeholder="选择文章"
          :loading="articleLoading"
          @visible-change="queryArticle">
          <el-option
            v-for="article in articles"
            :key="article.id"
            :label="article.title"
            :value="article.id">
          </el-option>
        </el-select>
      </el-form-item>
    </query-group>

    <crud-operation
      crud="d"
      :delete-disabled="selectedComments.length===0"></crud-operation>

    <section class="comment-table">
      <el-table
        ref="multipleTable"
        :data="comments"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          prop="article.title"
          label="文章"
          width="200">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          min-width="360">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称"
          min-width="180">
          <template slot-scope="{row}">
            <span :class="{'user-nickname':isUser(row.userId)}">{{row.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteComment([scope.row])">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
import QueryGroup from "@/components/form/QueryGroup";
import CrudOperation from "@/components/form/CrudOperation";
import query from "@/mixins/query";
import {deleteArticleComment, queryArticleCommentWithArticleBy} from "@/api/comment";
import {queryArticleBy} from "@/api/article";
export default {
  name: "PlutoComment",
  components: {CrudOperation, QueryGroup},
  mixins: [query],
  data(){
    return {
      query: {
        content: '',
        articleId: null,
        size: 15,
        page: 0,
      },
      total: 0,
      comments: [],
      selectedComments: [],
      articles: [],
      articleLoading: false,
      articleLoaded: false,
    }
  },
  methods: {
    refresh(){
      queryArticleCommentWithArticleBy(this.query).then(data => {
        this.comments = data.content;
        this.total = data.total;
      }).catch(() => {})
    },
    queryArticle(){
      if(!this.articleLoaded && !this.articleLoading){
        this.articleLoading = true;
        queryArticleBy({
          status: 4,
          deleted: false
        }).then(data => {
          this.articleLoading = false;
          this.articleLoaded = true;
          this.articles = data.content;
        }).catch(() => {})
      }
    },
    deleteComment(comments){
      let tips = `${comments.length}个评论`;
      this.$confirm(`确定要删除${tips}吗`,{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = comments.map(c => c.id);
        return deleteArticleComment(ids);
      }).then(() => {
        this.refresh();
        this.$message.success("删除评论成功")
      }).catch(() => {})
    },
    updateComment(comments){

    },
    handleSelectionChange(val){
      this.selectedComments = val;
    },
    isUser(userId){
      return userId && userId.includes('-');
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.pluto-comment{
  .user-nickname{
    color: var(--vscode-annotation);
  }
}
</style>
