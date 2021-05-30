<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="article-glide"></glide>

    <template v-if="articleLoaded">
      <section class="common-section article-section" ref="articleSection">
        <article-container :article="article" :class="`article-${article.id}`">
        </article-container>
        <div class="toc" ref="toc"></div>
      </section>

      <section class="common-section">
        <comment-form
          @commentSuccess="handleCommentSuccess"
          :avatar="$store.getters.userAvatar"
          :article-id="this.article.id"></comment-form>
      </section>

      <section class="common-section comment-section">
        <div class="comment-header">
          <span>{{article.comments}}</span>
          <span>评论</span>
          <el-divider></el-divider>
        </div>
        <ul v-if="comments.length !== 0">
          <li
            v-for="comment in comments"
            :key="comment.id">
            <comment-view
              @commentSuccess="handleCommentSuccess"
              :comment="comment"></comment-view>
          </li>
        </ul>
        <div v-else class="no-more-content">来发评论吧~</div>
      </section>

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
    </template>

  </div>
</template>

<script>
import Glide from '../../../components/glide/index';
import ArticleContainer from "./ArticleContainer";
import CommentForm from "../../../components/comment/CommentForm";
import {listArticleView} from "@/api/article";
import {fromArticle} from "@/utils/glide";
import {queryArticleCommentBy} from "@/api/comment";
import CommentView from "@/components/comment/CommentView";
import Toc from "@/components/toc/toc";
import NeplogConfig from "@/config/neplog";
import query from "@/mixins/query";

export default {
  name: "Article",
  components: {
    CommentView,
    Glide,
    ArticleContainer,
    CommentForm,
  },
  mixins:[query],
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {
        id: 0
      },
      query:{
        articleId: this.id,
        size: 15,
        page: 0,
      },
      total: 0,
      tocDone: true,
      glides: [],
      comments: [],
      articleLoaded: false,
    }
  },
  activated() {
    this.refresh();
  },
  methods: {
    refresh() {
      listArticleView(this.id).then(data => {
        this.article = data;
        this.glides = fromArticle(data);
        this.articleLoaded = true;
        this.$store.commit('setMeta', {
          title: data.title,
          keywords: this.article.tags.map(tag => tag.tag).join(','),
          description: this.article.summary
        })

        this.$nextTick(() => {
          let toc = this.$refs.toc;
          if(toc){
            for(let child of toc.children){
              toc.removeChild(child);
            }
            Toc.disableScrollToc();
          }

          let h = NeplogConfig.navBarHeight;
          let rootEl = Toc.generateToc(`.article-${this.article.id}`, {fixedHeading: h});
          this.$refs.toc.appendChild(rootEl);
        })

        this.refreshComment();
      }).catch(error => {
        if(error.status === 404){
          this.glides = [{
            title:'Not Found',
            img: NeplogConfig.imgNotFound
          }]
        } else if(error.status === 403){
          // TODO forbidden
        }
      });

    },
    refreshComment(){
      this.query.articleId = this.id;
      queryArticleCommentBy(this.query).then(data => {
        this.comments = data.content;
        this.total = data.total;
      }).catch(() => {})
    },
    handleCommentSuccess(){
      this.refreshComment();
      this.article.comments++;
    }
  },
  watch: {
    // 从/article/:id1到/article/:id2不会触发组件activated,deactivated
    id(newVal, oldVal){
      if(newVal !== oldVal){
        this.refresh();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.common-section {
  width: 80%;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px -6px rgba(10, 110, 179, 0.5);
}


.article-section {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px 20px 20px 30px;

  .toc {
    width: 160px;
    position: relative;

    ::v-deep .table-of-contents {
      margin: 20px 0;
      width: 150px;
      height: auto;
      position: sticky;
      top: 67px;
      z-index: 1;
      overflow: hidden;
      font-size: 15px;
      line-height: 20px;

      ol {
        word-wrap: anywhere;
        padding-left: 17px;
      }

      li > ol {
        display: none;
      }

      a {
        height: 100%;
        color: #000;
      }

      a:before {
        content: "";
        position: absolute;
        display: block;
        left: 6px;
        height: inherit;
        width: 2px;
        background-color: #eeeeee;
      }

      .toc-active > a{
        color: #0097e6;
      }

      .toc-active > ol {
        display: block;
      }

      .toc-active-only a:before {
        background-color: #0097e6;
      }
    }
  }

}

.comment-section{
  padding: 20px 32px;
  .comment-header{
    font-weight: 600;
    font-size: 26px;
    span:first-of-type{
      margin-right: 12px;
    }
  }
}

@media (max-width: 1100px) {
  .common-section {
    width: 90%;
  }
}

@media (max-width: 992px) {
  .article-section .toc{
    display: none;
  }
}

@media (max-width: 768px) {
  .common-section {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .avatar-area {
    display: none;
  }
}
</style>
