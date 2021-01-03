<template>
  <div class="comment-view">
    <div class="user">
      <div class="user-avatar" slot="user-avatar">
        <img class="avatar" src="https://pic2.zhimg.com/da8e974dc_is.jpg" alt="">
      </div>
      <div class="user-info">
        <span class="nickname">{{comment.nickname}}</span>
        <span v-if="comment.father">回复</span>
        <span v-if="comment.father" class="nickname">Neptu</span>
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

    <div class="comment-content markdown-body" v-html="comment.content">

    </div>

    <div class="comment-foot">
      <span class="date">{{comment.createTime}}</span>
      <span class="pointer"><i class="fa fa-smile-o"></i> {{comment.likes}}</span>
      <span class="pointer"><i class="fa fa-frown-o"></i> 0</span>
      <span class="reply" @click="activeReply(i)">Reply</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CommentView",
  components: {

  },
  props: {
    comment: {
      id: 0,
      content: '',
      avatar: '',
      nickname: '',
      link: '',
      email: '',
      articleId: null,
      fatherId: null,
      likes: 0,
      userAgent: 'Unknown',
      operatingSystem: 'Unknown',
      createTime: '',
      father: {
        nickname: '',
        link: '',
        avatar: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-view {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .user {
    .user-avatar {
      float: left;
      margin-right: 20px;
    }

    .user-info {
      .nickname {
        color: var(--primary-green);
      }

      .nickname.author {
        color: #0097e6;
      }

      span {
        margin-right: 10px;
      }
    }

    .avatar {
      width: 60px;
      border-radius: 50%;
    }

    .user-agent {
      margin-top: 6px;

      .fa {
        margin-right: 3px;
      }

      .os, .ua {
        border-radius: 5px;
        padding: 0 3px;
        font-size: 14px;
        line-height: 20px;
      }

      .ua {
        margin-left: 1px;
      }

      .os.windows {
        color: #0097e6;
      }

      .ua.chrome {
        color: rgb(255, 206, 69);
      }
    }
  }

  .sub-comment {
    padding-left: 80px;
  }

  .comment-content {
    overflow-x: auto;
    width: 100%;
  }

  .comment-foot {
    margin-top: 7px;
    display: flex;
    flex-wrap: nowrap;
    position: relative;

    span, .more-action {
      background-color: #fff;
      z-index: 1;
      color: #8b8b8b;
      padding: 0 6px;
    }

    .date {
      margin-left: 80px;
    }

    &:after {
      content: "";
      width: 100%;
      height: 1px;
      display: block;
      position: absolute;
      bottom: 10px;
      background-color: #c6e2ff;
      z-index: 0;
    }

    .reply {
      color: #a0cfff;
      cursor: pointer;
    }
  }

  .comment-reply {
    padding: 15px 0 0 0;

    .comment-submit {
      .user-info {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
  .comment-list {
    font-size: 13px;

    .sub-comment {
      padding-left: 0;
    }
    .user {
      .user-avatar {
        width: 50px;
      }
      .avatar {
        margin-bottom: 7px;
        width: 40px;
      }
      .user-agent {
        margin-top: 0;
      }
    }

    .comment-foot {
      .date {
        margin-left: 0;
      }
      &:after {
        bottom: 7px;
      }
    }
  }
}
</style>
