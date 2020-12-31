<template>
  <div class="article-edit">

    <el-form :model="article" label-position="top" :rules="rules" ref="articleForm">
      <el-form-item prop="title">
        <el-input v-model="article.title" placeholder="Title"></el-input>
      </el-form-item>
      <el-button @click="drawer = true" type="primary">More</el-button>

      <el-drawer
        title="更多选项"
        :visible.sync="drawer"
        :direction="'rtl'"
        :size="''"
        :custom-class="'form-drawer'">

        <div class="form-advanced">
          <!--封面图-->
          <el-upload
            class="cover-upload"
            drag
            action="#"
            :before-upload="uploadArticleCover"
            with-credentials
            multiple>
            <img v-if="article.cover" :src="article.cover" class="cover">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>

          <el-form-item label="摘要">
            <el-input
              type="textarea"
              v-model="article.summary"
              placeholder="Summary"
              :autosize="{minRows: 2, maxRows: 5}"
              resize="none"></el-input>
          </el-form-item>

          <el-form-item label="文章分类" prop="category">
            <el-select
              class="form-advanced-item"
              v-model="article.category"
              default-first-option
              filterable
              allow-create
              placeholder="文章分类">
              <el-option
                v-for="ca in availableCategories"
                :key="ca.id"
                :label="ca.name"
                :value="ca.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阅读权限">
            <el-select
              class="form-advanced-item"
              v-model="article.viewPermission"
              placeholder="阅读权限">
              <el-option
                v-for="per in availableViewPermission"
                :key="per.value"
                :label="per.label"
                :value="per.value"
                :disabled="per.disabled">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="评论权限">
            <el-select
              class="form-advanced-item"
              v-model="article.commentPermission"
              placeholder="评论权限">
              <el-option
                v-for="per in availableCommentPermission"
                :key="per.value"
                :label="per.label"
                :value="per.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签">
            <el-select
              class="form-advanced-item"
              multiple
              filterable
              allow-create
              v-model="article.tags"
              placeholder="标签"
              value-key="tag">
              <el-option
                v-for="(tag) in availableTags"
                :key="tag.tag"
                :label="tag.tag"
                :value="tag">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="setTopPriority">置顶</el-checkbox>
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="8">
              <el-button class="nep-button-common full-width" @click="saveArticle(0)">存为草稿</el-button>
            </el-col>
            <el-col :span="8">
              <el-button class="nep-button-primary full-width" @click="saveArticle(4)">发布</el-button>
            </el-col>
            <el-col :span="8">
              <el-button class="nep-button-primary full-width">放弃修改</el-button>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
    </el-form>

    <mavon-editor
      ref=md
      v-model="article.content"
      id="editor"
      style="height: 780px;z-index: unset"
      @save="handleSave"
      @imgAdd="uploadImg"></mavon-editor>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import rules from '@/utils/rules/article';
// eslint-disable-next-line no-unused-vars
import {createArticle, updateDeleted, updateArticle, findArticleDetail} from "@/api/article";
import {deleteFile, uploadCover, uploadImg} from "@/api/file";
import {getAllTags} from "@/api/tag";
import {getAllCategories} from "@/api/category";

export default {
  name: "index",
  components: {},
  props: {
    id: {
      type: [Number,String],
      default: null
    }
  },
  data() {
    return {
      drawer: false,
      setTopPriority: false,
      rules: rules,
      availableTags: [],
      availableCategories: [],
      availableViewPermission: [{
        value: 0, label: '任何人'
      }, {
        value: 4, label: '仅登录用户'
      }, {
        value: 8, label: '需要密码', disabled: true
      }, {
        value: 16, label: '私有'
      }],
      availableCommentPermission: [{
        value: 0, label: '任何人'
      }, {
        value: 4, label: '需要审核'
      }, {
        value: 8, label: '仅登录用户'
      }, {
        value: 16, label: '关闭评论'
      }],
      article: {
        id: null,
        title: 'title',
        summary: '',
        content: '',
        htmlContent: '',
        cover: '',
        priority: 0,
        status: 0,
        commentPermission: 0,
        viewPermission: 0,
        // category: '',
        tags: []
      },
    }
  },
  methods: {
    handleSave(value, render) {
      this.article.htmlContent = render;
      this.saveArticle();
    },
    uploadImg(pos, file){
      uploadImg(file).then(url => {
        this.$refs.md.$img2Url(pos,url);
      })
    },
    retrieveTags() {
      getAllTags().then(data => {
        this.availableTags = this.availableTags.concat(data);
      })
    },
    retrieveCategories() {
      getAllCategories().then(data => {
        this.availableCategories = this.availableCategories.concat(data)
      }).catch(() => {})
    },
    retrieveArticle() {
      findArticleDetail(this.id).then(data => {
        this.article = data
      }).catch(() => {})
    },
    refresh() {
      // 路径为article/new时新建文章
      if(Number(this.id)){
        this.retrieveArticle()
      }
      this.retrieveTags();
      this.retrieveCategories();
    },
    uploadArticleCover(file){
      uploadCover(file).then(path => {
        if(this.article.cover) deleteFile(this.article.cover);
        this.article.cover = path;
      }).catch(() => {})
      return false;
    },
    saveArticle(status){
      if(Number.isInteger(status)){
        this.article.status = status;
      }
      this.$refs.articleForm.validate(valid => {
        if(valid){
          this.article.htmlContent = this.$refs.md.d_render;
          // 生成摘要
          if(this.article.summary.trim().length === 0){
            let htmlNode = document.querySelector('#editor .v-show-content');
            this.article.summary = htmlNode.textContent.substr(0,255);
          }
          updateArticle(this.article).then(data => {
            this.$message.success("更新文章成功")
            this.drawer = false;
            if(!this.article.id && data){
              this.article.id = data;
              let paths = this.$route.fullPath.split('/');
              paths[paths.length - 1] = data;
              this.$router.replace({path: paths.join('/')});
              location.reload();
            }
          }).catch(() => {})
        } else {
          return false;
        }
      })
    }
  },
  mounted() {
    this.refresh()
  },
  watch: {
    setTopPriority: {
      handler(newValue) {
        this.article.priority = newValue ? 1 : 0;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.article-edit {

  ::v-deep {
    .form-drawer {
      width: 390px;
      overflow-y: auto;
    }

    .el-drawer__header {
      margin-bottom: 10px;
    }

    .el-form-item__label {
      font-size: 16px;
      padding-bottom: 0;
    }
  }

  .form-advanced {
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  .form-advanced-item {
    width: 100%;
  }

  .cover {
    object-fit: cover;
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 576px) {
  .article-edit {
    ::v-deep .form-drawer {
      width: 360px;
    }

    .cover-upload {
      width: 330px;

      ::v-deep .el-upload-dragger {
        width: 330px;
      }
    }
  }
}
</style>
