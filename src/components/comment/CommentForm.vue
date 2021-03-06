<template>
  <div class="comment-form">
    <div v-if="showAvatar" class="avatar-area">
      <img class="blog-avatar" :src="avatar" alt="">
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
      <span v-if="$store.getters.user.isLogin">
        以{{$store.getters.user.nickname}}登录
      </span>
      <div class="anonymous-input" v-else>
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
      <el-button
        size="medium"
        type="primary"
        class="submit-button"
        :loading="loading"
        @click="postComment">评论</el-button>
    </el-form>
  </div>
</template>

<script>
import {createArticleComment} from "@/api/comment";
import UserAgent from "@/utils/user-agent";
import NeplogConfig from "@/config/neplog";
const {browser, os} = UserAgent;

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
      default: NeplogConfig.defaultAvatar
    },
    articleId: {
      type: Number,
      required: true
    },
    parentId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      comment: {
        parentId: null,
        articleId: null,
        content: '',
        nickname: '',
        email: '',
        link: '',
        userAgent: 'Unknown',
        operatingSystem: 'Unknown',
      }
    }
  },
  mounted() {
    this.comment.userAgent = browser.name + " " + browser.version;
    this.comment.operatingSystem = os.name + " " + os.version;
    this.comment.nickname = this.$store.getters.user.nickname;
  },
  methods: {
    postComment(){
      this.loading = true;
      this.comment.parentId = this.parentId;
      this.comment.articleId = this.articleId;
      createArticleComment(this.comment).then(() => {
        this.comment.content = ''
        this.$message.success("提交评论成功")
        this.$emit('commentSuccess');
      }).catch(() => {
        this.$emit('commentFailure');
      }).finally(() => {
        this.$emit('commentComplete');
        this.loading = false;
      });
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

    .blog-avatar {
      margin-bottom: 10px;
      width: 75px;
      border-radius: 50%;
    }
  }

  .submit-area{
    width: 100%;
  }
  .submit-button{
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
