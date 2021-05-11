<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="article-glide"></glide>

    <section class="flex-section article-section" ref="articleSection">
      <article-container :article="article"></article-container>
      <div class="toc" ref="toc" v-if="tocDone">

      </div>
    </section>

    <section class="flex-section">
      <comment-form :article-id="this.article.id"></comment-form>
    </section>

    <section class="flex-section">
      <ul>
        <li
          v-for="comment in comments"
          :key="comment.id">
          <comment-view :comment="comment"></comment-view>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
import Glide from '../../components/glide/index';
import ArticleContainer from "./ArticleContainer";
import CommentForm from "../../components/comment/CommentForm";
import {listArticleView} from "@/api/article";
import {fromArticle} from "@/utils/glide";
import {findByArticleId} from "@/api/comment";
import CommentView from "@/components/comment/CommentView";
import Toc from "@/components/toc/toc";
import neplog from "@/config/neplog";

let links, anchors;

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
        document.title = data.title + ' - ' + this.$store.getters.blogConfig.blogName;
        this.$nextTick(() => {
          let h = neplog.navBarHeight;
          this.$refs.toc.appendChild(Toc.generateToc('.article-body', {fixedHeading: h}));
        })
      });
      findByArticleId(this.id).then(data => {
        this.comments = data;
      }).catch(() => {})
    },

    appendToc(){
      // let toc = document.querySelector('.table-of-contents');
      // if (toc) {
      //   this.$refs.toc.appendChild(toc);
      //   links = toc.querySelectorAll('li');
      //   anchors = this.$refs.articleSection
      //     .querySelectorAll('.article-body h1, h2, h3, h4, h5, h6');
      //
      //   window.addEventListener('scroll', this.scrollToc);
      //   window.addEventListener('scroll', this.displayDrawer)
      //   this.smoothAnchorScroll();
      // } else {
      //   this.tocDone = false;
      // }
    },
    scrollToc() {
      if (!links) return;
      let scrollTop = document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop;
      let bodyHeight = document.body.clientHeight
        && document.documentElement.clientHeight;
      links.forEach(e => e.classList.remove('toc-active', 'toc-active-only'));
      for (let i = 0; i < anchors.length; i++) {
        if (anchors[i].offsetTop > scrollTop - 50 - bodyHeight * 0.4) { // glide height
          links[i].classList.add('toc-active-only');
          for (let parent = links[i];
               parent && parent !== this.$refs.toc;
               parent = parent.parentNode) {
            if (parent.tagName === 'LI') {
              parent.classList.add('toc-active');
            }
          }
          break;
        }
      }
    },
    smoothAnchorScroll() {
      if (!links) return;
      let bodyHeight = document.body.clientHeight && document.documentElement.clientHeight;
      links.forEach((e, i) => {
        e.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.scrollTo({
            top: anchors[i].offsetTop + bodyHeight * .4, // glide height
            behavior: "smooth"
          });
        })
      })
    }
  },
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
