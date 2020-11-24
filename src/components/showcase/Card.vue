<template>
  <div class="case-card" :class="tags">
    <a class="article-cover" :href="'/article/' + postId">
      <img v-lazy="cover" alt="">
    </a>
    <div class="article-info">
      <div class="title">
        <a href="">
          {{title}}
        </a>
      </div>
      <div class="detail">
        <p class="statics">
          <span>{{createDate}}</span>
          <span><i class="fa fa-user"></i>{{view}}</span>
          <span><i class="fa fa-comment"></i>{{comment}}</span>
          <span><i class="fa fa-heart"></i>{{like}}</span>
        </p>
      </div>
      <div class="summary">
        {{summary}}
      </div>
      <div class="tags">
        <button v-for="tag in tags" :key="tag">{{tag}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    postId: Number,
    cover: String,
    title: {
      type: String,
      default: 'TITLE'
    },
    createDate: {
      type: String,
      default: '2077-77-02'
    },
    view: {
      type: Number,
      default: 0
    },
    comment: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      required: false,
      default: 'summary'
    },
    tags: {
      type: Array,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.case-card{
  display: grid;
  grid-template-areas: "cover content";
  grid-template-columns: 330px 1fr;
  grid-template-rows: 220px;
  width: calc(45vw - 20px);
  margin: 10px;
  box-shadow: 0 1px 12px -6px rgba(0,0,0,.5);
  overflow: hidden; // to activate border-radius
  border-radius: 10px;

  .article-cover{
    display: block;
    grid-area: cover;
    transition: 0.4s ease-in-out;
    overflow: hidden;

    img{
      height: 220px;
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
      font-weight: 500;
      overflow: hidden;
      max-height: 40px;
      text-overflow: ellipsis;
      margin-bottom: 5px;

      a{
        transition: .4s ease;
        color: #2e2e2e;
      }
      a:hover{
        color: #0097e6;
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

  //&:nth-child(4n), &:nth-child(4n+3){
  //  grid-template-areas: "content cover";
  //  grid-template-columns: 1fr 330px;
  //}
}

@media (max-width: 1410px) {
  .case-card{
    grid-template-columns: 375px 1fr;
    grid-template-rows: 250px;
    width: 73vw;
    .article-cover{
      img{
        height: 250px;
      }
    }
    //&:nth-child(2n+1){
    //  grid-template-areas: "content cover";
    //  grid-template-columns: 1fr 375px;
    //}
  }
}
@media (max-width: 992px) {
  .case-card{
    width: 83vw;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 250px;
    .article-cover{
      img{
        height: 250px;
      }
    }
  }
}
@media (max-width: 768px){
  .case-card{
    width: calc(96vw - 20px);
    .article-cover{
      img{
        height: 250px;
      }
    }
  }
}
@media (max-width: 600px){
  .case-card{
    grid-template-areas: "cover" "content";
    grid-template-columns: 100%;
    grid-template-rows: 176px 194px;
  }

}
</style>
