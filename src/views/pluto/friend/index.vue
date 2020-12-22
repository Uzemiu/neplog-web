<template>
  <div class="pluto-friend">
    <h2 class="sharp-header">友链管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="我的好友" name="public"></el-tab-pane>
      <el-tab-pane label="待审核" name="pendingReview"></el-tab-pane>
    </el-tabs>
    <query-group>
      <el-form-item size="small">
        <el-input
          style="width: 160px"
          type="text"
          v-model="query.title"
          placeholder="输入好友名或简介"></el-input>
      </el-form-item>
    </query-group>
    <el-checkbox-group v-model="selected" class="friend-wrapper" :disabled="!multipleSelect">
      <el-checkbox v-for="friend in friends" :key="friend.id" class="friend" :label="friend.id">
        <friend-card
          :enable-edit="true"
          :friend="friend"
          @completeEdit="saveFriend">
          <el-dropdown-item v-if="friend.status === 0" slot="operation" :disabled="disableFriendCommit">
            <span>通过</span>
          </el-dropdown-item>
          <el-dropdown-item slot="operation" :disabled="disableFriendCommit">
            <span @click="deleteFriend([friend.id])">删除</span>
          </el-dropdown-item>
        </friend-card>
      </el-checkbox>
      <friend-card-empty class="friend"></friend-card-empty>
    </el-checkbox-group>
  </div>
</template>

<script>
import FriendCard from "@/components/friend/FriendCard";
import QueryGroup from "@/components/form/QueryGroup";
import FriendCardEmpty from "@/components/friend/FriendCardEmpty";
// eslint-disable-next-line no-unused-vars
import {createFriend,updateFriend,deleteFriend,findFriendBy} from "@/api/friend";

export default {
  name: "index",
  components: {FriendCardEmpty, QueryGroup, FriendCard},
  data(){
    return{
      activeSection: 'pendingReview',
      friends: [{
        id: null,
        name: 'Neptu',
        avatar: require('@/assets/imgs/tomorinao.jpg'),
        link: '#',
        introduction: 'Test1',
        status: 0,
      },{
        id: 2,
        name: 'Neptu2',
        avatar: require('@/assets/imgs/tomorinao.jpg'),
        link: '#',
        introduction: 'Test1',
        status: 0,
      }],
      multipleSelect: true,
      selected: [],
      query: {
        status: 1,
      },
      disableFriendCommit: false
    }
  },
  methods:{
    changeSection(tab){
      this.activeSection = tab.name;
    },
    saveFriend(friend){
      console.log(friend)
    },
    deleteFriend(id){
      deleteFriend(id).then(() => {
        this.$message.success('删除好友成功');
      }).catch(error => {
        this.$message.error(error.message);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pluto-friend{
  ::v-deep{
    .el-collapse-item__content{
      font-size: unset;
      line-height: unset;
    }
    .el-checkbox__input{
      display: none;
    }
    .el-checkbox__label{
      width: 100%;
      line-height: unset;
      padding-left: 0;
    }
    .el-checkbox__input.is-disabled+span.el-checkbox__label{
      cursor: unset;
    }
    .el-checkbox.is-checked .friend-card{
      border: var(--primary-blue) 1px solid;
    }
  }
  .friend-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .friend-list{
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .friend{
    margin: 5px;
    width: calc(25% - 10px);
  }
}

@media (max-width: 1479px){
  .pluto-friend .friend{
    width: calc(33% - 10px);
  }
}

@media (max-width: 1024px) {
  .friend-list .friend{
    width: calc(50% - 10px);
  }
}

@media (max-width: 576px) {
  .friend-list .friend{
    width: 100%;
  }
}
</style>
