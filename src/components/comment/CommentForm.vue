<template>
  <div class="comment-form">
    <div v-if="showAvatar" class="avatar-area">
      <img class="avatar" :src="avatar" alt="">
    </div>
    <el-form class="submit-area">
      <el-form-item>
        <el-input
          type="textarea"
          v-model="comment.content"
          placeholder="说点什么吧..."
          rows="5"
          maxlength="420"
          show-word-limit
          resize="none"></el-input>
      </el-form-item>
      <div class="anonymous-input">
        <el-form-item class="comment-input">
          <el-input placeholder="*昵称" v-model="comment.nickname"></el-input>
        </el-form-item>
        <el-form-item class="comment-input email-input">
          <el-input placeholder="邮箱" v-model="comment.email"></el-input>
        </el-form-item>
        <el-form-item class="comment-input">
          <el-input placeholder="个人站点" v-model="comment.link"></el-input>
        </el-form-item>
      </div>
<!--      <div class="submit-button">-->
        <el-button class="nep-button-primary" @click="postComment">评论</el-button>
<!--      </div>-->
    </el-form>
  </div>
</template>

<script>

import {postComment} from "@/api/comment";

export default {
  name: "CommentForm",
  components: {
  },
  props: {
    placeholder: {
      type: String,
      default: '说点什么吧'
    },
    showAvatar: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String,
      default: 'https://pic2.zhimg.com/da8e974dc_is.jpg'
    },
    articleId: {
      type: Number,
      required: true
    },
    fatherId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      comment: {
        fatherId: null,
        articleId: null,
        content: '',
        nickname: '',
        email: '',
        link: ''
      }
    }
  },
  methods: {
    postComment(){
      this.comment.fatherId = this.fatherId;
      this.comment.articleId = this.articleId;
      postComment(this.comment).then((data) => {
        this.$message.success("提交评论成功")
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-form {
  width: 100%;
  padding: 20px;
  display: flex;

  .avatar-area {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      margin-bottom: 10px;
      width: 75px;
      border-radius: 50%;
    }
  }

  .submit-area{
    width: 100%;
  }
  .nep-button-primary{
    float: right;
  }

  .anonymous-input{
    display: flex;
    .comment-input{
      width: 100%;
    }
    .email-input{
      margin: 0 15px;
    }
  }
}

@media (max-width: 768px) {
  .comment-form {
    .anonymous-input{
      flex-direction: column;
      .comment-input{
        margin: 0 0 5px 0;
      }
    }
  }
}

@media (max-width: 576px) {
  .comment-form {
    .avatar-area{
      display: none;
    }
  }
}
</style>
