<template>
  <div class="article-container">
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"/>
    <div class="article-header">
      <h1 class="article-title">
        TIPS:本博客金部署了前端样式和前端演示和呵呵呵
        TIPS:本博客金部署了前端样式和前端演示和呵呵呵
      </h1>
      <p class="date-info">
        <span>创建于:2020-02-02</span>
        <span>更新于:2020-02-02</span>
        <span>
          <i class="fa fa-folder-open"></i>
          <a href="">テースト</a>
        </span>
        <span class="tags">
          <i class="fa fa-tags"></i>
          <a href="">Java</a>
          <a href="">AvaJ</a>
        </span>
        <span><i class="fa fa-user"></i>{{view}}</span>
        <span><i class="fa fa-comment"></i>{{comment}}</span>
        <span><i class="fa fa-heart"></i>{{like}}</span>
      </p>
    </div>

    <div class="article-body markdown-body" v-html="article">

    </div>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {RemoteCss, RemoteJs} from "@/utils/remote-js";

import article from "@/utils/mock";
export default {
  name: "ArticleContainer",
  components: {
    RemoteCss,
    RemoteJs
  },
  data(){
    return {
      id: 0,
      title: 'title',
      view: 1,
      comment: 2,
      like: 3,
      article: article
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container{
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 13px 15px rgba(31,45,61,.1);

  .article-header{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    .article-title{
      font-size: 1.5em;
      padding: 0 20px;
      text-align: center;
    }
    .date-info{
      margin-top: 13px;
      color: var(--text-color-gray);

      span{
        margin: 0 8px;
        font-size: 13px;

        i.fa{
          margin-right: 4px
        }
        a{
          color: var(--text-color-gray)
        }
        a:nth-of-type(n+2){
          margin-left: 4px;
          &:before{
            content: "- "
          }
        }
      }
      span a{

      }
    }
  }
}
</style>
