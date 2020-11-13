<template>
  <div class="case-card" :class="tags">
    <a class="post-cover" :href="'/post/' + postId">
      <img :src="cover" alt="">
    </a>
    <div class="post-info">
      <div class="title">
        <a href="">
          米五十米五十米五十米速ss度
        </a>
      </div>
      <div class="detail">
        <p class="create-date">
          <span>2020-55-55</span>
        </p>
        <p class="statics">
          <span><i class="fa fa-user"></i>2220</span>
          <span><i class="fa fa-comment"></i>2220</span>
          <span><i class="fa fa-heart"></i>2220</span>
        </p>
      </div>
      <div class="summary">
        123123231231231迪杰斯特dsssssssssdsdsdsdddwdwsdsds打打
        打的无情的群无人情味群拉231231321
      </div>
      <div class="tags">
        <button>Java</button>
        <button>Java</button>
        <button>Java</button>
        <button>Java</button>
        <button>算法</button>
        <button>Java</button>
        <button>Java</button>
        <button>Java</button>
        <button>Java</button>
        <button>Java</button>
      </div>
<!--      <div class="statics">-->
<!--        <span><i class="fa fa-user"></i>232</span>-->
<!--        <span><i class="fa fa-commenting"></i>23</span>-->
<!--        <span><i class="fa fa-heart"></i>1</span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    postId: Number,
    cover: String,
    title: String,
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
  grid-template-columns: 160px 1fr;
  grid-template-rows: 160px;
  // 单vw会产生浮点数宽度，可能是导致isotope无法何时分配空间位置的原因
  width: calc(26.5vw - 1px);
  padding: 10px;

  .post-cover{
    display: block;
    grid-area: cover;
    border-radius: 5px;
    overflow: hidden; // to activate border-radius
    box-shadow: 18px 18px 18px rgba(0, 0, 0, 0.06);
    transition: 0.5s ease-in-out;

    img{
      width: 100%;
      object-fit: cover;
    }

    &:hover{
      transform: scale(1.05);
    }
  }

  .post-info{
    grid-area: content;
    padding-left: 15px;
    position: relative;
    overflow: hidden;

    .title{
      font-size: 20px;
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
      font-size: 13px;
      margin-bottom: 1px;
      span{
        margin-right: 6px;
      }
      .create-date{
        max-height: 15px;
        overflow: hidden;
        transition: .4s ease-in-out;
      }
      .statics{
        max-height: 0;
        overflow: hidden;
        transition: .4s ease-in-out;
      }

      &:hover{
        .create-date{
          max-height: 0;
        }
        .statics{
          max-height: 15px;
        }
      }
    }

    .summary{
      word-wrap: anywhere;
      font-size: 15px;
      color: #8b8b8b;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;

      &:hover{
        color: #2e2e2e;
      }
    }

    .tags{
      display: flex;
      position: absolute;
      bottom: 0;
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
        height: 25px;
        right: 0;
        background: linear-gradient(90deg,rgba(240,242,247,.05),#fff);
      }
    }

    // unused
    //.statics{
    //  position: absolute;
    //  bottom: 0;
    //
    //  .fa{
    //    transition: .4s ease;
    //  }
    //  span{
    //    padding-right: 14px;
    //  }
    //
    //  &:hover{
    //    .fa-user{
    //      color: #44bd32;
    //    }
    //    .fa-commenting{
    //      color: #0097e6;
    //    }
    //    .fa-heart{
    //      color: #ff434f;
    //    }
    //  }
    //
    //}
  }
}

@media (max-width: 1410px) {
  .case-card{
    width: calc(40vw - 1px);
  }
}
@media (max-width: 992px) {
  .case-card{
    grid-template-columns: 150px 1fr;
    grid-template-rows: 150px;
    width: calc(48vw - 1px);
  }
}
@media (max-width: 768px){
  .case-card{
    width: calc(96vw - 1px)
  }
}
@media (max-width: 576px){

}
</style>
