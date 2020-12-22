<template>
  <div class="friend-card">
    <el-popover placement="top-start"
                trigger="click"
                offset="120"
                :value="popoverVisible"
                :disabled="!editing">
      <label class="friend-input">
        头像链接:
        <input v-model="friend.avatar" type="text">
      </label>
      <label class="friend-input">
        博客链接:
        <input v-model="friend.link" type="text">
      </label>
      <a slot="reference" :href="editing ? '#' : friend.link" :target="editing ? '_self' : '_blank'">
        <img v-lazy="friend.avatar" class="avatar" :alt="friend.name">
      </a>
    </el-popover>
    <input v-model="friend.name" v-if="editing" type="text" class="name friend-input" placeholder="名字"/>
    <a v-else :href="friend.link" target="_blank">
      <h4 class="name">{{friend.name}}</h4>
    </a>
    <textarea v-model="friend.introduction" v-if="editing" cols="18" rows="2" class="intro" placeholder="简介"></textarea>
    <a :href="friend.link" target="_blank" v-else>
      <span class="intro">{{friend.introduction}}</span>
    </a>
    <el-dropdown class="operation" placement="top" v-if="enableEdit">
      <span>
        {{editing ? '编辑中...' : '操作'}}<i class="el-icon-arrow-up el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="disableCommit"><span @click="toggleEdit">{{editing ? '完成编辑并提交' : '编辑'}}</span></el-dropdown-item>
        <slot name="operation"></slot>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="create-cover" v-if="showCover"></div>
  </div>
</template>

<script>
  export default {
    name: "FriendCard",
    props: {
      enableEdit:{
        type: Boolean,
        default: false
      },
      disableCommit: {
        type: Boolean,
        default: false,
      },
      showCover:{
        type: Boolean,
        default: false
      },
      friend: {
        type: Object,
        default: function(){
          return {
            avatar: require('@/assets/imgs/tomorinao.jpg'),
            name: 'N',
            introduction: '',
            link: '',
          }
        }
      }
    },
    data(){
      return {
        editing: false,
      }
    },
    methods: {
      toggleEdit(){
        if(this.editing){
          this.$emit('completeEdit',this.friend, res => {
            this.editing = !(this.editing && res);
          });
        } else {
          this.editing = true;
        }
      }
    },
    computed: {
      popoverVisible(){
        return this.editing;
      },
    }
  }
</script>

<style lang="scss" scoped>
  $friend-border-color: var(--tertiary-blue);
  .friend-card {
    display: inline-block;
    width: 100%;
    height: 110px;
    border: 1px solid $friend-border-color;
    border-radius: 10px;
    padding: 15px 20px 15px 20px;
    transition: .3s;
    position: relative;

    .friend-input {
      width: calc(100% - 95px);
      border: 0;
      font-family: "Noto Serif SC";
      font-size: 16px;
      font-weight: 600;
      line-height: 15px;
      border-bottom: 1px solid var(--tertiary-blue);

      &:hover{
        box-shadow: 0 0 2px 1px var(--tertiary-blue);
      }
    }

    textarea{
      width: calc(100% - 95px);
      border: 0;
      overflow: hidden;
      resize: none;
      &:hover{
        box-shadow:  0 0 2px 1px var(--tertiary-blue);
      }
    }

    .avatar{
      float: left;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid #ddd;
      padding: 2px;
      margin-right: 10px;
    }
    .name{
      color: var(--secondary-blue);
      margin-top: 5px;
      padding-bottom: 5px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 29px;
      font-size: 16px;

      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        background-color: $friend-border-color;
        height: 1px;
        width: 100%;
      }
    }
    .intro{
      padding-top: 5px;
      color: #2e2e2e;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 170px;
    }
    &:hover{
      border-color: var(--primary-blue);
    }
    .operation{
      position: absolute;
      top: 3px;
      right: 6px;
      font-size: 12px;

      span{
        padding: 3px;
        cursor: pointer;
      }
    }
    .create-cover{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      width: 100%;
    }
  }
</style>
