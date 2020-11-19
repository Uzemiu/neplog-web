<template>
  <div class="comment-container">

    <div class="comment-submit">
      <div class="user-info">
        <img class="avatar" src="https://pic2.zhimg.com/da8e974dc_is.jpg" alt="">
      </div>

      <div class="submit-area">
        <div class="word-counter">{{leftWordCount}}</div>
        <textarea rows="6" class="comment" v-model="comment"></textarea>
        <div class="anonymous-input">
          <input type="text" placeholder="*昵称" class="username" v-model="username">
          <input type="text" placeholder="*邮箱" class="email" v-model="email">
          <input type="text" placeholder="个人站点" class="site" v-model="site">
        </div>
        <div class="submit-button">
          <button>评论</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "CommentContainer",
  data(){
    return {
      comment: '',
      username: '',
      email: '',
      site: ''
    }
  },
  computed: {
    leftWordCount(){
      return 140 - this.comment.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container{
  width: 100%;
  padding: 20px;

  .comment-submit{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-direction: row;

    input, .comment{
      outline: none;
    }

    .user-info{
      width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar{
        margin-bottom: 10px;
        width: 100px;
        border-radius: 50%;
      }

      .username{
        font-size: 16px;
        padding: 2px 0;
        border: none;
        border-radius: 5px;
        text-align: center;
        width: 80%;

        &:focus{
          border: var(--text-color-gray);
          outline: #8b8b8b 1px solid;
        }
      }

    }

    .submit-area{
      width: 100%;
      position: relative;

      .comment{
        resize: none;
        position: relative;
        padding: 15px 20px 5px 10px;
        font-size: 16px;
        width: 100%;
        background-color: #f8f8f8;
        max-height: 200px;
        overflow-y: auto;
        border-radius: 5px;
        border: 1px rgb(229,233,239) solid;
      }

      .word-counter{
        position: absolute;
        color: #8b8b8b;
        right: 6px;
        top: 3px;
        font-size: 13px;
        z-index: 1;
      }

      .anonymous-input{
        margin-top: 10px;
        display: flex;

        input{
          width: 33%;
          border: 1px rgb(229,233,239) solid;
          border-radius: 5px;
          background-color: #f8f8f8;
          font-size: 16px;
          padding: 10px 10px;
        }

        input:nth-last-child(n+2){
          margin-right: 20px;
        }
      }

      .submit-button{
        margin-top: 10px;
        text-align: right;

        button{
          outline: none;
          font-size: 16px;
          cursor: pointer;
          padding: 6px 18px;
          border: none;
          border-radius: 5px;
          color: #fff;
          background-color: #0097e6;

          &:hover{
            opacity: 0.9;
          }
        }
      }
    }
  }
}

@media (max-width: 992px) {
}

@media (max-width: 768px){
  .comment-container{
    .comment-submit{
      .user-info{
        width: 100px;
        .avatar{
          width: 60px;
        }
      }
      .submit-area{

        .comment{
          font-size: 15px;
          max-height: 80px;
        }

        .anonymous-input{
          flex-direction: column;

          input{
            margin-bottom: 10px;
            width: 100%;
            padding: 5px 5px;
            font-size: 14px;
          }
        }

        .submit-button{
          margin-top: 0;
          button{
            font-size: 14px;
          }
        }
      }
    }
  }


}
@media (max-width: 576px){

}
</style>
