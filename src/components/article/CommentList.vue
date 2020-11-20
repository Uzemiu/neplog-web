<template>
  <div class="comment-list">
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
      <div slot="main" class="comment-action">
        <button class="reply">Reply</button>
        <button class="delete">Delete</button>
      </div>
    </Comment>
  </div>
</template>

<script>
import Comment from "@/components/article/Comment";

export default {
  name: "CommentList",
  components: {
    Comment
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

  .sub-comment{
    padding-left: 80px;
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
      span{
        margin-right: 10px;
      }
    }
    .avatar{
      margin-bottom: 10px;
      width: 60px;
      border-radius: 50%;
    }
  }

  .comment-content{
    margin-top: 10px;
    overflow-x: auto;
    width: 100%;
  }
  .comment-action{
    margin-top: 10px;
    text-align: right;

    button{
      margin-left: 10px;
      border: none;
      cursor: pointer;
      background: none;
      font-size: 16px;

    }

    .reply{
      color: #a0cfff;
    }
    .delete{
      color: #f56c6c;
    }
  }
}

@media (max-width: 768px) {
}
@media (max-width: 576px){
  .comment-list{
    font-size: 14px;

    .sub-comment{
      padding-left: 0;
    }

    .user{
      .user-avatar{
        width: 60px;
      }
      .avatar{
        margin-bottom: 7px;
        width: 40px;
      }
    }
  }
}
</style>
