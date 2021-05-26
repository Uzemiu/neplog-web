<template>
  <div class="comment-view">
    <div class="user">
      <div class="user-avatar" slot="user-avatar">
        <img class="blog-avatar" :src="comment.avatar || defaultAvatar" alt="">
      </div>
      <div class="user-info">
        <span class="nickname">{{comment.nickname}}</span>
        <span v-if="parent">回复</span>
        <a v-if="parent"
           :href="parent.link || '#'">
          <span class="nickname">{{parent.nickname}}</span>
        </a>
      </div>
      <div class="user-agent">
          <span class="os windows">
            <i class="fa fa-windows"></i>
            <span>{{comment.operatingSystem}}</span>
          </span>
        <span class="ua chrome">
            <i class="fa fa-chrome"></i>
            <span>{{comment.userAgent}}</span>
          </span>
      </div>
    </div>

    <div class="comment-content markdown-body" v-html="comment.content">

    </div>

    <div class="comment-foot">
      <span class="date">{{comment.createTime}}</span>
      <span class="pointer"><i class="fa fa-smile-o"></i> {{comment.likes}}</span>
      <span class="pointer"><i class="fa fa-frown-o"></i> 0</span>
      <span class="reply" @click="activeReply">{{showReply ? '收起回复' : '回复'}}</span>
    </div>

    <component
      v-show="showReply"
      v-on="$listeners"
      :is="reply"
      :show-avatar="false"
      :parent-id="comment.id"
      :article-id="comment.articleId"></component>

    <ul>
      <li
        v-for="child in comment.children"
        :key="child.id">
        <comment-view
          :comment="child"
          :parent="comment"
          class="sub-comment"></comment-view>
      </li>
    </ul>
  </div>
</template>

<script>
import NeplogConfig from "@/config/neplog";

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
      parentId: null,
      likes: 0,
      userAgent: 'Unknown',
      operatingSystem: 'Unknown',
      createTime: '',
      children: [],
      parent: {
        nickname: '',
        link: '',
        avatar: '',
      }
    },
    parent: Object
  },
  data(){
    return {
      showReply: false,
      reply: null,
      defaultAvatar: NeplogConfig.defaultAvatar,
    }
  },
  methods: {
    activeReply(){
      if(!this.reply){
        this.reply = () => import("@/components/comment/CommentForm");
      }
      this.showReply = !this.showReply;
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
  font-size: 14px;

  .user {
    .user-avatar {
      float: left;
      margin-right: 20px;
    }

    .user-info {
      .nickname {
        color: var(--primary-green);
        font-weight: 600;
        font-size: 15px;
      }

      .nickname.author {
        color: #0097e6;
      }

      span {
        margin-right: 10px;
      }
    }

    .blog-avatar {
      width: 60px;
      border-radius: 50%;
    }

    .user-agent {
      font-size: 12px;
      margin-top: 6px;

      .fa {
        margin-right: 3px;
      }

      .os, .ua {
        border-radius: 5px;
        padding: 0 3px;
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
    padding: 10px 0 0 50px;
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
  .comment-view {
    .sub-comment {
      padding: 10px 0 0 30px;
    }
  }
}

@media (max-width: 576px) {
  .comment-view {
    font-size: 13px;

    .sub-comment {
      padding: 30px 0 0 0;
    }
    .user {
      .user-avatar {
        width: 50px;
        margin-right: 0;
      }
      .blog-avatar {
        margin-bottom: 7px;
        width: 40px;
      }
      .user-agent {
        margin-top: 0;
      }
    }

    .comment-foot {
      .date {
        margin-left: 40px;
      }
      &:after {
        bottom: 7px;
      }
    }
  }
}
</style>
