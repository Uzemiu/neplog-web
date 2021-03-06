<template>
  <div class="article-card" :mode="mode">
    <a class="article-cover" :href="'/article/' + article.id" v-if="mode !== 'edit'">
      <img v-lazy="article.cover" :alt="article.title">
    </a>
    <div class="article-info">
      <router-link :to="(mode === 'edit' ? '/pluto' : '') + '/article/' + article.id" class="title">
        <h4>{{article.title}}</h4>
      </router-link>
      <div class="detail">
        <p class="statics">
          <span>{{article.createTime || '2077-07-07'}}</span>
          <span class="ignorable"><i class="fa fa-fire-alt"></i> {{article.views || 0}}</span>
<!--          <span class="ignorable"><i class="fa fa-comment-o"></i> {{article.comments || 0}}</span>-->
<!--          <span class="ignorable"><i class="fa fa-heart-o"></i> {{article.likes || 0}}</span>-->
        </p>
      </div>
      <div class="summary">
        {{article.summary || 'summary'}}
      </div>
      <div class="tags ignorable" v-if="mode === 'view' && article.tags">
        <button v-for="tag in article.tags" :key="tag">{{tag}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    mode: {
      type: String,
      default: 'show'
    },
    article: {
      id: Number,
      cover: String,
      title: String,
      createTime: String,
      views: Number,
      comments: Number,
      likes: Number,
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
  grid-template-rows: 270px;
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
      margin-top: 16px;
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

@media (max-width: 768px){
  .article-card[mode=show]{
    grid-template-areas: "cover" "content";
    grid-template-columns: 100%;
    grid-template-rows: 155px 215px;
    .summary{
      font-size: 14px;
      margin-top: 10px;
    }
    img{
      object-fit: cover;
      height: 100%;
    }
  }
}

</style>

<style lang="scss" scoped>
.article-card[mode=list], .article-card[mode=edit]{
  grid-template-columns: 180px 1fr;
  grid-template-rows: 135px;

  .article-cover{
    img{
      height: 135px;
    }
    &:hover{
      transform: none;
    }
  }
  .article-info{
    .title{
      font-size: 16px;
      float: left;
      padding-right: 20px;
      margin-bottom: 0;
      line-height: unset;
    }
    .detail{
      margin-top: 0;
      .statics{
        margin-top: 0;
      }
    }
    .summary{
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .article-list-item{
    padding: 5px 0;
  }
}

@media (max-width: 576px) {
  .article-card[mode=list]{
    grid-template-areas: "cover" "content";
    grid-template-columns: 100%;
    grid-template-rows: 155px 215px;
    .article-info .title{
      display: block;
      float: unset;
      font-size: 22px;
      margin-bottom: 5px;
    }
    .article-cover img{
      height: 100%;
    }
    .article-info .summary{
      line-height: 20px;
    }
  }
}

</style>

<style lang="scss" scoped>
.article-card[mode=edit]{
  grid-template-columns: 0 1fr;
  grid-template-rows: 65px;
  .article-info{
    padding: 7px 10px 7px 10px;
  }
  .article-cover img{
    display: none;
  }
  .summary{
    max-height: 22px;
  }
}

@media (max-width: 768px) {
  .article-card[mode=edit]{
    grid-template-areas: "cover content";
    grid-template-columns: 0 1fr;
    grid-template-rows: 60px;

    .article-info .summary{
      line-height: 20px;
    }
  }
}

@media (max-width: 576px) {
  .article-card[mode=edit]{
    .article-info{
      padding: 7px;
    }
  }
  .ignorable{
    display: none;
  }
}
</style>
