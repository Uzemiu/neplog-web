<template>
  <div class="content-wrapper">
    <glide :glide-length="slides.length" class="article-glide">
      <glide-slide
        v-for="article in slides"
        :key="article.id"
        :link="`/article/${article.id}`"
        :title="article.title"
        :img="article.img">

      </glide-slide>
    </glide>

    <section class="flex-section article-section" ref="articleSection">
      <article-container></article-container>
      <div class="toc" ref="toc" :class="{drawn}">
        <div class="drawer" @click="doDraw" :class="{'show':showDrawer}">
          <i class="fa fa-angle-left"></i>
        </div>
      </div>
    </section>

    <section class="flex-section">
      <comment-container></comment-container>
    </section>

    <section class="flex-section">
      <comment-list></comment-list>
    </section>

  </div>
</template>

<script>
import Glide from '../glide/index'
import GlideSlide from "@/components/glide/GlideSlide";
import ArticleContainer from "./ArticleContainer";
import CommentContainer from "./CommentContainer";
import CommentList from "@/components/article/CommentList";

let links, anchors;

export default {
  name: "Article",
  components: {
    Glide,
    GlideSlide,
    ArticleContainer,
    CommentContainer,
    CommentList
  },
  data(){
    return {
      drawn: false,
      showDrawer: false,
      slides: [{
        id: 123,
        img: require('@/assets/imgs/71891897_p0.jpg'),
        title: 'TIPS：本博客仅部署了前端样式'
      }]
    }
  },
  methods: {
    scrollToc(){
      if(!links) return;
      let scrollTop = document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop;
      let bodyHeight = document.body.clientHeight
        && document.documentElement.clientHeight;
      links.forEach(e => e.classList.remove('toc-active','toc-active-only'));
      for(let i=0;i<anchors.length;i++){
        if(anchors[i].offsetTop > scrollTop - 50 - bodyHeight * 0.4){ // glide height
          links[i].classList.add('toc-active-only');
          for(let parent = links[i];
              parent && parent !== this.$refs.toc;
              parent = parent.parentNode){
            if(parent.tagName === 'LI'){
              parent.classList.add('toc-active');
            }
          }
          break;
        }
      }
    },
    smoothAnchorScroll(){
      if(!links) return;
      let bodyHeight = document.body.clientHeight && document.documentElement.clientHeight;
      links.forEach((e,i) => {
        e.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.scrollTo({
            top: anchors[i].offsetTop + bodyHeight * .4, // glide height
            behavior: "smooth"
          });
        })
      })
    },
    displayDrawer(){
      let bodyHeight = document.body.clientHeight && document.documentElement.clientHeight;
      if(window.pageYOffset > bodyHeight * .4){
        this.showDrawer = true;
      } else {
        this.showDrawer = false;
        this.drawn = false;
      }
    },
    doDraw(){
      this.drawn = !this.drawn;
    }
  },
  mounted() {
    let toc = document.querySelector('.table-of-contents');
    if(toc){
      this.$refs.toc.appendChild(toc);
      links = toc.querySelectorAll('li');
      anchors = this.$refs.articleSection
        .querySelectorAll('.article-body h1, h2, h3, h4, h5, h6');
      window.addEventListener('scroll',this.scrollToc);
      window.addEventListener('scroll',this.displayDrawer)
      this.smoothAnchorScroll();
    }

  }
}
</script>

<style lang="scss">
.content-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fafafa;

}

.flex-section{
  width: 80%;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 13px 15px rgba(31,45,61,.1);
}

.article-glide{

}

.article-section{
  position: relative;
  display: flex;
  flex-direction: row;

  .toc{
    width: 150px;
    position: relative;

    .table-of-contents{
      width: 150px;
      height: auto;
      position: sticky;
      top: 67px;
      z-index: 1;
      overflow: hidden;
      font-size: 18px;
      line-height: 24px;

      ol{
        word-wrap: anywhere;
        padding-left: 14px;
        padding-right: 5px;
      }

      li > ol{
        display: none;
      }

      a{
        height: 100%;
        color: #000;
      }

      a:before{
        content: "";
        position: absolute;
        display: block;
        left: 6px;
        height: inherit;
        width: 2px;
        background-color: #eeeeee;
      }

      .toc-active{
        ol{
          display: block;
        }
      }
      .toc-active-only a:before{
        background-color: #0097e6;
      }
    }

    .drawer{
      display: none;
      position: absolute;
      width: 17px;
      height: 40px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      background-color: #fafafa;
      box-shadow: -3px 0 15px rgba(31,45,61,.2);
      cursor: pointer;
      transition: .4s ease-in-out;
    }
  }

}


@media (max-width: 1100px) {
  .flex-section{
    width: 90%;
  }
}
@media (max-width: 838px) {
  .article-section{
    .toc{
      background-color: #fff;
      position: fixed;
      top: 67px;
      right: -150px;
      border-bottom-left-radius: 10px;
      transition: .4s ease-in-out;
      box-shadow: 0 0 15px rgba(31,45,61,.2);
      z-index: 999;

      &.drawn{
        right: 0;
      }

      .drawer{
        display: flex;
        justify-content: center;
        align-items: center;

        &.show{
          left: -17px;
        }
      }
    }
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
