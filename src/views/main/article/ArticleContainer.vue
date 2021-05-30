<template>
  <div class="article-container">
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"/>

    <div class="article-header">
      <p class="base-info">
        <span>{{ $store.getters.authorName }}</span>
        <span>Created: {{ article.createTime }}</span>
        <span>Updated: {{ article.updateTime }}</span>
      </p>
      <p class="base-info">
        <span>
          <i class="fa fa-folder-open-o"></i>
          <router-link
            v-if="article.category"
            :to="`/category/${article.category.id}`">
            {{ article.category.name }}
          </router-link>
        </span>
        <span class="tags" v-if="article.tags && article.tags.length">
          <i class="fa fa-tags"></i>
          <router-link
            :to="`/tag/${tag.id}`"
            v-for="tag in article.tags"
            :key="tag.id">
            {{ tag.tag }}
          </router-link>
        </span>
        <span><i class="fa fa-fire-alt"></i>{{ article.views }}</span>
      </p>
    </div>

    <article
      class="article-body markdown-body serif-sc"
      v-html="article.htmlContent">
    </article>

    <el-divider>
      <i class="like-icon fa" :class="[articleLike.opinion === 1 ? 'fa-heart' : 'fa-heart-o']"
         @click="updateLike"></i>
    </el-divider>
    <div class="article-share">
      <span class="cc-text">
        本文遵循
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
          CC BY-NC-SA 4.0
        </a>
        协议
      </span>
      <div>
        <a :href="qqShareUrl()" target="_blank" class="share-links">
          <i class="fa fa-qq"></i>
        </a>
        <a :href="weiboShareUrl()" target="_blank" class="share-links">
          <i class="fa fa-weibo"></i>
        </a>
        <a href="#" target="_self" class="share-links">
          <i class="fab fa-weixin"></i>
        </a>
      </div>
    </div>
    <el-divider></el-divider>

    <div class="article-recommended">
      <article-card-simple
        v-if="article.prev"
        class="article-left"
        title-tip="上一篇文章"
        :article="article.prev">
      </article-card-simple>
      <article-card-simple
        v-if="article.next"
        class="article-right"
        title-tip="下一篇文章"
        :article="article.next">
      </article-card-simple>
    </div>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import '@/assets/css/highlight/highlight-css.scss'
import '@/assets/css/highlight/highlight-html.scss'
import {RemoteCss, RemoteJs} from "@/utils/remote-tags";
import ArticleCardSimple from "@/components/article/ArticleCardSimple";
import {getLike, postLike} from "@/api/article-like";

export default {
  name: "ArticleContainer",
  components: {
    ArticleCardSimple,
    RemoteCss,
    RemoteJs
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articleLike: {
        targetId: this.article.id,
        opinion: 0,
      },
    }
  },
  methods: {
    getArticleLike() {
      getLike(this.article.id).then(data => {
        if (data) {
          this.articleLike = data;
        } else {
          this.articleLike.opinion = 0;
        }
      }).catch(() => {
      })
    },
    updateLike() {
      this.articleLike.opinion = this.articleLike.opinion ? 0 : 1; // 切换点赞状态
      postLike(this.articleLike).then(() => {
        if (this.articleLike.opinion === 1) {
          this.$anime({
            targets: '.like-icon',
            scale: [
              {value: .5, easing: 'easeOutSine', duration: 100},
              {value: 1.6, easing: 'easeInOutQuad', duration: 200},
              {value: 1, easing: 'easeOutSine', duration: 100},
            ],
          })
        }
      }).catch(() => {
      })
    },
    wechatShareUrl() {
      return '#'
    },
    qqShareUrl() {
      return 'http://connect.qq.com/widget/shareqq/index.html'
        + `?url=${location.href}`
        + `&title=${document.title}`
        + `&source=${document.title}`
        + `&desc=${this.article.summary}`
        + `&summary=${this.article.summary}`
        + `&pics=${location.origin}${this.article.cover}`
    },
    weiboShareUrl() {
      return 'http://service.weibo.com/share/share.php' +
        `?url=${location.href}` +
        `&appkey=` +
        `&title=${document.title}` +
        `&pic=${location.origin}${this.article.cover}`
    }
  },
  mounted() {
  },
  watch: {
    article(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getArticleLike();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {

  width: calc(100% - 160px);
  padding: 0 20px 20px 0;
  position: relative;
  color: #434343;

  .article-header {

    .article-title {
      font-size: 1.5em;
    }

    .base-info {
      margin-bottom: 15px;
      color: var(--text-color-gray);
      text-align: left;

      .bull {
        margin: 0 3px;
      }

      span {
        margin-right: 16px;
        font-size: 15px;

        i.fa {
          margin-right: 4px
        }

        a {
          color: var(--text-color-gray)
        }
      }
    }
  }

  .tags {
    a {
      margin: 0 3px;
    }
  }

  .article-body {
    margin-top: 20px;
    margin-bottom: 60px;
    line-height: 20px;
    font-family: "Noto Serif SC", serif;

    code {
      font-size: 100%;
      font-family: Consolas, serif;
    }
  }

  .like-icon {
    font-size: 24px;
    cursor: pointer;
    transition: .2s ease;
  }

  .fa-heart-o {
    color: #888;

    &:hover {
      color: #FC4032;
    }
  }

  .fa-heart {
    color: #FC4032;
  }

  .article-share {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .cc-text {
      display: block;
      color: #888;
      font-size: 14px;
      margin-bottom: 10px;

      .fa, .fab {
        font-size: 14px;
        margin: 0;
      }
    }

    .like-item {
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #bbb;
      border-radius: 50%;
      margin-right: 12px;
    }

    .fa, .fab {
      color: #888;
      font-size: 20px;
      margin: 0 10px;
      cursor: pointer;
      transition: .2s ease;
    }

    .share-links:hover {
      .fa-qq {
        color: #3a8ee6;
      }

      .fa-weibo {
        color: #E6162D;
      }

      .fa-weixin {
        color: #1AAD19;
      }
    }
  }

  .article-recommended {
    display: flex;

    .article-left, .article-right {
      width: 100%;
    }

    .article-right ::v-deep .content {
      text-align: right;
    }
  }
}

@media (max-width: 992px) {
  .article-container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .common-section {
  }
}

@media (max-width: 576px) {

}
</style>
