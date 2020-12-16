<template>
  <div class="article-edit">

    <el-form :model="article" :label-position="'top'" :rules="rules" ref="articleForm">
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
            <img v-if="article.cover" :src="`http://localhost/${article.cover}`" class="cover">
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>

          <el-form-item :label="'摘要'">
            <el-input type="textarea" v-model="article.summary" placeholder="Summary"></el-input>
          </el-form-item>

          <el-form-item :label="'文章分类'">
            <el-select
              class="form-advanced-item"
              v-model="article.category"
              default-first-option
              placeholder="文章分类">
              <el-option
                v-for="ca in availableCategories"
                :key="ca.id"
                :label="ca.name"
                :value="ca">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="'阅读权限'">
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

          <el-form-item :label="'评论权限'">
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

          <el-form-item :label="'标签'">
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
              <el-button class="nep-button-common full-width" @click="saveDraft">存为草稿</el-button>
            </el-col>
            <el-col :span="8">
              <el-button class="nep-button-primary full-width" @click="publishArticle">发布</el-button>
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
      style="height: 780px;z-index: unset"
      @save="handleSave"></mavon-editor>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import rules from '@/utils/rules/article';
// eslint-disable-next-line no-unused-vars
import {createArticle, updateDeleted, updateArticle, findArticleDetail} from "@/api/article";
import {deleteFile, uploadCover} from "@/api/file";
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
        cover: require('@/assets/imgs/75977007_p0.jpg'),
        priority: 0,
        status: 0,
        commentPermission: 0,
        viewPermission: 0,
        category: {
          id: Number,
          name: String
        },
        tags: []
      },
    }
  },
  methods: {
    handleSave(value, render) {
      this.article.htmlContent = render;
      this.saveArticle();
    },
    retrieveTags() {
      getAllTags().then(data => {
        this.availableTags = this.availableTags.concat(data);
      })
    },
    retrieveCategories() {
      getAllCategories().then(data => {
        this.availableCategories = this.availableCategories.concat(data)
      })
    },
    retrieveArticle() {
      // eslint-disable-next-line no-unused-vars
      let query = {
        id: 33,
        content: 'nihao',
        categoryId: 0,
        deleted: false,
        createTime: ['2019-12-12 2:2:1','2020-2-2 3:3:3']
      }
      // findArticle(query);
      findArticleDetail(this.id).then(data => {
        this.article = data
      }).catch(error => {
        this.$message.error(error.message)
      })
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
      uploadCover(file,'cover').then(path => {
        if(this.article.cover) deleteFile(this.article.cover);
        this.article.cover = path;
      }).catch(error => {
        this.$message.error(error.message);
      })
      return false;
    },
    saveDraft(){
      this.article.status = 0;
      this.saveArticle();
    },
    publishArticle(){
      this.article.status = 4;
      this.saveArticle();
    },
    saveArticle(){
      this.$refs.articleForm.validate(valid => {
        if(valid){
          this.article.htmlContent = this.$refs.md.d_render;
          updateArticle(this.article).then(() => {
            this.$message.success("更新文章成功")
          }).catch(error => {
            this.$message.error(error.message);
          })
        } else {
          console.log('error')
          return false;
        }
      })
    }
  },
  mounted() {
    this.$refs.md.markdownIt
      .use(anchor)
      .use(markdownItTocDoneRight);
    let md = this.$refs.md.markdownIt;

    md.options.highlight = function (str, lang) {
      if (lang && window.hljs.getLanguage(lang)) {
        const preCode = window.hljs.highlight(lang, str, true).value
        const lines = preCode.split(/\n/).length - 1;
        let lineNumbers = '<span class="line-numbers">';
        for (let i = 0; i < lines; ++i) {
          lineNumbers += '<span class="line-number"></span>'
        }
        lineNumbers += '</span>';
        return preCode + lineNumbers;
      }
      const preCode = md.utils.escapeHtml(str)
      return '<pre class="hljs"><code>' + preCode +
        '</code></pre>'
    }
    md.disable('toc')

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
