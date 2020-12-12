<template>
  <div class="content-wrapper">
    <glide :glides="glides" class="article-glide"></glide>

    <section class="flex-section article-section" ref="articleSection">
      <article-container></article-container>
      <div class="toc" ref="toc" :class="{drawn}" v-if="tocDone">
        <div class="drawer" @click="doDraw" :class="{'show':showDrawer}">
          <i class="fa fa-angle-left"></i>
        </div>
      </div>
    </section>

    <section class="flex-section">
      <comment-form>
        <div slot="user-avatar" class="avatar-area">
          <img class="avatar" src="https://pic2.zhimg.com/da8e974dc_is.jpg" alt="">
        </div>
      </comment-form>
    </section>

    <section class="flex-section">
      <comment-list></comment-list>
    </section>

  </div>
</template>

<script>
import Glide from '../../components/glide/index';
import ArticleContainer from "./ArticleContainer";
import CommentForm from "../../components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";

let links, anchors;

export default {
  name: "Article",
  components: {
    Glide,
    ArticleContainer,
    CommentForm,
    CommentList
  },
  data(){
    return {
      tocDone: true,
      drawn: false,
      showDrawer: false,
      glides: [{
        id: 123,
        link: '#',
        img: require('@/assets/imgs/71891897_p0.jpg'),
        title: 'TIPS：本博客仅部署了前端样式'
      }]
    }
  },
  mounted() {
    let toc = document.querySelector('.table-of-contents');
    if(toc){
      this.$refs.toc.appendChild(toc);
      links = toc.querySelectorAll('li');
      anchors = this.$refs.articleSection
        .querySelectorAll('.comment-body h1, h2, h3, h4, h5, h6');
      window.addEventListener('scroll',this.scrollToc);
      window.addEventListener('scroll',this.displayDrawer)
      this.smoothAnchorScroll();
    } else {
      this.tocDone = false;
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
}
</script>

<style lang="scss" scoped>
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


.avatar-area{
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar{
    margin-bottom: 10px;
    width: 100px;
    border-radius: 50%;
  }

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
  .avatar-area{
    display: none;
  }
}
</style>
