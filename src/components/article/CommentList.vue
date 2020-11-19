<template>
  <div class="comment-list">
    <Comment>
      <img slot="user" class="avatar" src="https://pic2.zhimg.com/da8e974dc_is.jpg" alt="">
      <div slot="main-before" class="user-info">
        <span>UserName</span>
        <span>Windows 10</span>
        <span>Chrome</span>
      </div>
      <div slot="input" class="comment-content markdown-body">
        <pre><div class="hljs"><code class="lang-java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] args)</span></span>{
          System.out.println('#');}
</code></div></pre>
      </div>
      <div slot="action" class="comment-action">
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

  .avatar{
    margin-bottom: 10px;
    width: 100px;
    border-radius: 50%;
  }

  .user-info{
    span{
      margin-right: 10px;
    }
  }
  .comment-content{
    margin-top: 10px;
  }
  .comment-action{
    margin-top: 10px;
    text-align: right;
  }
}
</style>
