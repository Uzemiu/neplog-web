<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="article-glide"></glide>

    <template v-if="articleLoaded">
      <section class="flex-section article-section" ref="articleSection">
        <article-container :article="article"></article-container>
        <div class="toc" ref="toc" v-if="tocDone">

        </div>
      </section>

      <section class="flex-section">
        <comment-form
          @commentSuccess="refreshComment"
          :article-id="this.article.id"></comment-form>
      </section>

      <section class="flex-section">
        <ul>
          <li
            v-for="comment in comments"
            :key="comment.id">
            <comment-view
              @commentSuccess="refreshComment"
              :comment="comment"></comment-view>
          </li>
        </ul>
      </section>
    </template>

  </div>
</template>

<script>
import Glide from '../../../components/glide/index';
import ArticleContainer from "./ArticleContainer";
import CommentForm from "../../../components/comment/CommentForm";
import {listArticleView} from "@/api/article";
import {fromArticle} from "@/utils/glide";
import {findByArticleId} from "@/api/comment";
import CommentView from "@/components/comment/CommentView";
import Toc from "@/components/toc/toc";
import NeplogConfig from "@/config/neplog";

export default {
  name: "Article",
  components: {
    CommentView,
    Glide,
    ArticleContainer,
    CommentForm,
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {
        id: 0,
        category:{
          id: 1,
          name: ''
        }
      },
      tocDone: true,
      glides: [],
      comments: [],
      articleLoaded: false
    }
  },
  mounted() {
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
          keywords: this.article.tags.map(tag => tag.tag).join(' '),
          description: this.article.summary
        })

        this.$nextTick(() => {
          let h = NeplogConfig.navBarHeight;
          this.$refs.toc.appendChild(Toc.generateToc('.article-body', {fixedHeading: h}));
        })
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
      this.refreshComment();
    },
    refreshComment(){
      findByArticleId(this.id).then(data => {
        this.comments = data;
      }).catch(() => {})
    },
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //background-color: #fafafa;
}

.flex-section {
  width: 80%;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 5px 13px rgba(31, 45, 61, .1);
}

.article-section {
  position: relative;
  display: flex;
  flex-direction: row;

  .toc {
    width: 200px;
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
        //white-space: nowrap;
        padding-left: 17px;
        //padding-right: 7px;
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

@media (max-width: 1100px) {
  .flex-section {
    width: 90%;
  }
}

@media (max-width: 838px) {
  .article-section {
    .toc {
      display: none;

      background-color: #fff;
      position: fixed;
      top: 67px;
      right: -150px;
      border-bottom-left-radius: 10px;
      transition: .4s ease-in-out;
      box-shadow: 0 0 15px rgba(31, 45, 61, .2);
      z-index: 999;
    }
  }
}

@media (max-width: 768px) {
  .flex-section {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .avatar-area {
    display: none;
  }
}
</style>
