<template>
  <div class="article-card" :class="article.tags">
    <a class="article-cover" :href="'/comment/' + article.id">
      <img v-lazy="article.cover" alt="">
    </a>
    <div class="article-info">
      <a href="" class="title">
        <h4>{{article.title}}</h4>
      </a>
      <div class="detail">
        <p class="statics">
          <span>{{article.createDate || '2077-07-07'}}</span>
          <span><i class="fa fa-user"></i> {{article.view || 0}}</span>
          <span><i class="fa fa-comment"></i> {{article.comment || 0}}</span>
          <span><i class="fa fa-heart"></i> {{article.like || 0}}</span>
        </p>
      </div>
      <div class="summary">
        {{article.summary || 'summary'}}
      </div>
      <div class="tags">
        <button v-for="tag in article.tags" :key="tag">{{tag}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    article: {
      id: Number,
      cover: String,
      title: String,
      createDate: String,
      view: Number,
      comment: Number,
      like: Number,
      summary: String,
      tags: Array,
    }
  }
}
</script>

<style lang="scss" scoped>
.article-card{
  display: grid;
  grid-template-areas: "cover content";
  grid-template-columns: 360px 1fr;
  grid-template-rows: 250px;
  width: 100%;
  box-shadow: 0 1px 12px -6px rgba(10,105,170,.5);
  overflow: hidden;
  border-radius: 10px;

  .article-cover{
    display: block;
    grid-area: cover;
    transition: 0.4s ease-in-out;
    overflow: hidden;

    img{
      height: 270px;
      width: 100%;
      object-fit: cover;
    }

    &:hover{
      transform: scale(1.05);
    }
  }

  .article-info{
    grid-area: content;
    padding: 15px 20px;
    position: relative;
    overflow: hidden;

    .title{
      font-size: 22px;
      line-height: 20px;
      overflow: hidden;
      max-height: 44px;
      text-overflow: ellipsis;
      margin-bottom: 5px;
      transition: .4s ease;
      color: #2e2e2e;
      &:hover{
        color: var(--primary-blue);
      }
    }

    .detail{
      color: var(--text-color-gray);
      font-size: 14px;
      margin-bottom: 1px;
      span{
        margin-right: 8px;
      }
      .statics{
        margin-top: 10px;
        max-height: 15px;
        line-height: 22px;
        transition: .4s ease-in-out;
      }

    }

    .summary{
      margin-top: 10px;
      word-wrap: anywhere;
      font-size: 16px;
      color: #8b8b8b;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      line-height: 25px;

      &:hover{
        color: #2e2e2e;
      }
    }

    .tags{
      display: flex;
      position: absolute;
      bottom: 15px;
      width: calc(100% - 15px); // -15px是post-info的padding-left

      button{
        flex-shrink: 0;
        border: 0;
        border-radius: 4px;
        background-color: #ff434f;
        color: #fff;
        padding: 4px 5px;
        margin-right: 7px;
        font-size: 13px;
      }

      &::before{
        content: "";
        position: absolute;
        width: 20px;
        height: 27px;
        right: 0;
        background: linear-gradient(90deg,rgba(240,242,247,.04),#fff);
      }
    }
  }

}

@media (max-width: 992px) {
  .article-card{
    /*grid-template-columns: 300px 1fr;*/
    /*grid-template-rows: 250px;*/
    .article-cover{
      img{
        /*height: 250px;*/
      }
    }
  }
}
@media (max-width: 768px){
  .article-card{
    grid-template-areas: "cover" "content";
    grid-template-columns: 100%;
    grid-template-rows: 28vh 233px;
  }

}
</style>
