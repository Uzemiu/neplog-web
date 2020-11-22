<template>
  <div class="comment-list">
    <div class="list-header">
      <span>共8条评论</span>
    </div>
    <Comment v-for="i in 6" :key="i" :class="{'sub-comment': i % 3 !== 1}">
      <div class="user" slot="main">
        <div class="user-avatar" slot="user-avatar">
          <img class="avatar" src="https://pic2.zhimg.com/da8e974dc_is.jpg" alt="">
        </div>
        <div class="user-info">
          <span class="username">Username</span>
          <span>回复</span>
          <span class="username">Neptu</span>
        </div>
        <div class="user-agent">
          <span class="os windows">
            <i class="fa fa-windows"></i>
            <span>Windows 10</span>
          </span>
          <span class="ua chrome">
            <i class="fa fa-chrome"></i>
            <span>Chrome</span>
          </span>
        </div>
      </div>

      <div slot="main" class="comment-content markdown-body">
        <pre><div class="hljs"><code class="lang-java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] args)</span></span>{
          System.out.println('#');}
</code></div></pre>
      </div>
      <div slot="main" class="comment-foot">
        <span class="date">2020-11-21 25:81:22</span>
        <span class="pointer"><i class="fa fa-smile-o"></i> 1</span>
        <span class="pointer"><i class="fa fa-frown-o"></i> 0</span>
        <span class="reply" @click="activeReply(i)">Reply</span>
        <div class="more-action">
          <i class="fa fa-ellipsis-v"></i>
          <div class="action-list">
            <ul>
              <li>删除评论</li>
              <li>删除</li>
            </ul>
          </div>
        </div>
      </div>

      <component :is="test"></component>

    </Comment>
  </div>
</template>

<script>
import Comment from "@/components/article/Comment";
import CommentContainer from "./CommentContainer";

export default {
  name: "CommentList",
  components: {
    Comment,
    CommentContainer
  },
  data(){
    return{
      replyComment: [],
      test: null
    }
  },
  methods: {
    activeReply(i){
      this.$set(this.replyComment,i, CommentContainer);
      this.test = () => import("./CommentContainer")
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list{
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .list-header{
    margin-bottom: 15px;
    font-size: 18px;

    &:after{

    }
  }

  .user{
    .user-avatar{
      float: left;
      width: 80px;
    }
    .user-info{
      .username{
        color: #67c23a;
      }
      .username.author{
        color: #0097e6;
      }
      span{
        margin-right: 10px;
      }
    }
    .avatar{
      margin-bottom: 10px;
      width: 60px;
      border-radius: 50%;
    }
    .user-agent{
      margin-top: 6px;
      .fa{
        margin-right: 3px;
      }
      .os, .ua{
        border-radius: 5px;
        padding: 0 3px;
        font-size: 14px;
        line-height: 20px;
      }
      .ua{
        margin-left: 1px;
      }
      .os.windows{
        color: #0097e6;
      }

      .ua.chrome{
        color: rgb(255,206,69);
      }
    }
  }

  .sub-comment{
    padding-left: 80px;
  }

  .comment-content{
    margin-top: 10px;
    overflow-x: auto;
    width: 100%;
  }
  .comment-foot{
    margin-top: 7px;
    display: flex;
    flex-wrap: nowrap;

    span, .more-action{
      background-color: #fff;
      z-index: 1;
      color: #8b8b8b;
      padding: 0 6px;
    }

    .date{
      margin-left: 80px;
    }

    &:after{
      content: "";
      width: 100%;
      height: 1px;
      display: block;
      position: absolute;
      bottom: 10px;
      background-color: #c6e2ff;
      z-index: 0;
    }

    .reply{
      color: #a0cfff;
    }

    .more-action{
      margin-right: 12px;
      margin-left: auto;
      cursor: pointer;
      position: relative;

      .action-list{
        display: none;
        background-color: #fff;
        position: absolute;
        width: 80px;
        top: -50px;
        left: -33px;
        text-align: center;
        border: 1px solid #e5e9ef;
        box-shadow: 0 0 5px rgba(0,0,0,.2);
        font-size: 14px;
        li{
          line-height: 24px;
          height: 24px;
        }
        li:hover{
          background-color: var(--text-color-lightest);
        }
      }

      &:hover .action-list{
        display: block;
      }
    }
  }
}

@media (max-width: 768px) {
}
@media (max-width: 576px){
  .comment-list{
    font-size: 13px;

    .sub-comment{
      padding-left: 0;
    }

    .user{
      .user-avatar{
        width: 50px;
      }
      .avatar{
        margin-bottom: 7px;
        width: 40px;
      }
      .user-agent{
        margin-top: 0;
      }
    }

    .comment-foot{
      .date{
        margin-left: 0;
      }
      &:after{
        bottom: 7px;
      }
    }
  }
}
</style>
