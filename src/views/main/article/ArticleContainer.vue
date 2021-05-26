<template>
  <div class="article-container">
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"/>

    <div class="article-header">
      <p class="base-info">
        <span>{{$store.getters.authorName}}</span>
        <span>Created: {{article.createTime}}</span>
        <span>Updated: {{article.updateTime}}</span>
      </p>
      <p class="base-info">
        <span>
          <i class="fa fa-folder-open-o"></i>
          <router-link
            v-if="article.category"
            :to="`/category/${article.category.id}`">
            {{article.category.name}}
          </router-link>
        </span>
        <span class="tags" v-if="article.tags && article.tags.length">
          <i class="fa fa-tags"></i>
          <router-link
            :to="`/tag/${tag.id}`"
            v-for="tag in article.tags"
            :key="tag.id">
            {{tag.tag}}
          </router-link>
        </span>
        <span><i class="fa fa-fire-alt"></i>{{article.views}}</span>
      </p>
    </div>

    <article
      class="article-body markdown-body serif-sc"
      v-html="article.htmlContent">

    </article>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import '@/assets/css/highlight/highlight-css.scss'
import '@/assets/css/highlight/highlight-html.scss'
import {RemoteCss, RemoteJs} from "@/utils/remote-tags";

export default {
  name: "ArticleContainer",
  components: {
    RemoteCss,
    RemoteJs
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss">
.article-container{
  width: calc(100% - 200px);
  padding: 20px 20px 40px 40px;
  position: relative;
  color: #434343;

  .article-header{

    .article-title{
      font-size: 1.5em;
    }
    .base-info{
      margin-bottom: 15px;
      color: var(--text-color-gray);
      text-align: left;

      .bull{
        margin: 0 3px;
      }
      span{
        margin-right: 16px;
        font-size: 15px;

        i.fa{
          margin-right: 4px
        }
        a{
          color: var(--text-color-gray)
        }
      }
    }
  }

  .tags{
    a{
      margin: 0 3px;
    }
  }

  .article-body{
    margin-top: 20px;
    line-height: 20px;
    font-family: "Noto Serif SC",serif;

    code{
      font-size: 100%;
      font-family: Consolas,serif;
    }
  }
}

@media (max-width: 992px) {
  .article-container{
    width: 100%;
    padding-left: 20px;
  }
}

@media (max-width: 768px){
  .common-section{
  }
}
@media (max-width: 576px){

}
</style>
