<template>
  <div class="article-edit">

    <el-form :model="article" label-position="top" :rules="rules" ref="articleForm">
      <el-form-item prop="title">
        <el-input v-model="article.title" placeholder="Title"></el-input>
      </el-form-item>

      <el-drawer
        title="更多选项"
        :visible.sync="drawer"
        :direction="'rtl'"
        :size="''"
        :custom-class="'form-drawer'">

        <div class="form-advanced">
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
              value-key="id"
              placeholder="文章分类">

              <el-option
                v-for="ca in availableCategories"
                :key="ca.id"
                :label="ca.name"
                :value="ca">
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
                :value="per.value"
                :disabled="per.disabled">
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
              value-key="id">
              <el-option
                v-for="(tag) in availableTags"
                :key="tag.id"
                :label="tag.name"
                :value="tag">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="setTopPriority">置顶</el-checkbox>
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="8">
              <el-button
                v-if="article.status === 0"
                class="full-width"
                @click="saveArticle(0)">存为草稿</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                size="medium"
                class="full-width"
                @click="saveArticle(4)">{{article.status === 0 ? '发布' : '保存'}}</el-button>
            </el-col>
            <el-col :span="8">
              <el-button size="medium" class="full-width">返回</el-button>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
    </el-form>

    <mavon-editor
      ref=md
      id="editor"
      style="height: 720px;z-index: unset"
      v-model="article.content"
      :tabSize="4"
      @save="handleSave"
      @imgAdd="uploadImg"></mavon-editor>

    <div class="action">
      <el-button @click="drawer = true" type="primary">更多设置</el-button>
      <el-button v-if="article.status===0" @click="saveArticle(0)">存为草稿</el-button>
      <el-button
        type="primary"
        @click="saveArticle(4)">{{article.status === 0 ? '发布' : '保存'}}</el-button>
    </div>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import {updateArticle, listArticleDetail} from "@/api/article";
import {uploadCover, uploadImg} from "@/api/file";
import {getAllTags} from "@/api/tag";
import {queryCategoryBy} from "@/api/category";

export default {
  name: "ArticleEditor",
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
      rules: {
        title: [
          {required: true, message: '请输入文章标题', trigger:'blur'},
          {min: 1, max: 255, message: '标题长度在255个字符以内', trigger: 'blur'}
        ],
      },
      availableTags: [],
      availableCategories: [],
      availableViewPermission: [{
        value: 0, label: '任何人'
      },{
        value: 8, label: '需要密码', disabled: true
      }, {
        value: 16, label: '私有'
      }],
      availableCommentPermission: [{
        value: 0, label: '任何人'
      }, {
        value: 4, label: '需要审核', disabled: true
      }, {
        value: 8, label: '仅登录用户', disabled: true
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
        category: null,
        tags: []
      },
    }
  },
  methods: {
    handleSave() {
      this.saveArticle();
    },
    uploadImg(pos, file){
      uploadImg(file).then(url => {
        this.$refs.md.$img2Url(pos,url);
      }).catch(() => {})
    },
    retrieveTags() {
      getAllTags().then(data => {
        this.availableTags = data;
      })
    },
    retrieveCategories() {
      queryCategoryBy().then(data => {
        this.availableCategories = data;
      }).catch(() => {})
    },
    retrieveArticle() {
      listArticleDetail(this.id).then(data => {
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
      this.$crop(file,(blob, filename, close) => {
        uploadCover(blob, filename).then(url => {
          this.article.cover = url;
          close();
        }).catch(() => {})
      }, {
        autoCropWidth: 1900,
        autoCropHeight: 1000,
      })
      return false;
    },
    saveArticle(status){
      if(Number.isInteger(status)){
        this.article.status = status;
      }
      let reloadCategory = false;
      let reloadTag = false;
      // 转换
      if(typeof(this.article.category) === 'string'){
        reloadCategory = true;
        this.article.category = {id: null, name:this.article.category};
      }
      this.article.tags.forEach((tag,i) => {
        if(typeof(tag) === 'string'){
          reloadTag = true;
          this.article.tags[i] = {id:null,name:tag};
        }
      })

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
              location.reload(); // 新建文章重新加载

            } else if(reloadTag || reloadCategory) {
              // 新建标签/分类时获取新建标签/分类的id
              listArticleDetail(this.id).then(data => {
                this.article.category = data.category;
                let newTags = data.tags;
                this.article.tags.forEach(tag => {
                  let idx = newTags.findIndex(t => t.name === tag.name);
                  if(idx >= 0){
                    tag.id = newTags[idx].id;
                  }
                })
              }).catch(() => {})
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
  width: 100%;

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

  .action{
    display: flex;
    justify-content: flex-end;
    position: fixed;
    padding: 10px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 10px 1px rgba(0,0,0,.15);;
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
