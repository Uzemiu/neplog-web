<template>
  <div class="article-container">
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"/>
    <remote-css href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"/>
    <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"/>

    <div class="article-header">
      <p class="base-info">
        <span>Neptu</span>
        <span>Created: 2020-02-02</span>
        <span>Updated: 2020-02-02</span>
      </p>
      <p class="base-info">
        <span>
          <i class="fa fa-folder-open"></i>
          <a href="">テースト</a>
        </span>
        <span class="tags">
          <i class="fa fa-tags"></i>
          <a href="">Java</a>
          <span class="bull">·</span>
          <a href="">AvaJ</a>
        </span>
        <span><i class="fa fa-user"></i>{{view}}</span>
      </p>
    </div>

    <article class="article-body markdown-body serif-sc" v-html="article">

    </article>
    <div class="article-foot">

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
import {article} from "@/utils/mock";

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
      article: ''
    }
  },
  mounted() {
    this.axios
      .get('http://localhost:8080/LanguageStyle.html')
      .then(success => {
        this.article = success.data;
        // eslint-disable-next-line no-unused-vars
      }, failure => {
        this.article = article;
      });
  },
  methods: {

  }
}
</script>

<style lang="scss">
.article-container{
  width: calc(100% - 20px);
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

  .article-body{
    margin-top: 20px;
    line-height: 20px;
    font-family: "Noto Serif SC";

    code{
      font-size: 100%;
      font-family: Consolas,serif;
    }
  }
}

@media (max-width: 992px) {
}

@media (max-width: 838px) {
  .article-container{
    width: 100%;
    padding-left: 20px;
  }
}

@media (max-width: 768px){
  .flex-section{
    width: 100%;
  }
}
@media (max-width: 576px){

}
</style>
