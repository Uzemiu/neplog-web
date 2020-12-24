<template>
  <div class="pluto-friend">
    <h2 class="sharp-header">友链管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane :label="`我的好友(${count.public})`" name="public" :query="{status: 1}"></el-tab-pane>
      <el-tab-pane :label="`待审核(${count.pending})`" name="pending" :query="{status: 0}"></el-tab-pane>
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

    <el-checkbox v-model="multipleSelect">批量修改</el-checkbox>

    <el-checkbox-group v-model="selected" class="friend-wrapper" :disabled="!multipleSelect">
      <el-checkbox v-for="friend in friends" :key="friend.id" class="friend" :label="friend.id">
        <friend-card
          :enable-edit="true"
          :friend="friend"
          @completeEdit="saveFriend">
          <el-dropdown-item v-if="friend.status === 0" slot="operation" :disabled="disableFriendCommit">
            <span @click="pass(friend)">通过</span>
          </el-dropdown-item>
          <el-dropdown-item slot="operation" :disabled="disableFriendCommit">
            <span @click="deleteFriend([friend.id])">删除</span>
          </el-dropdown-item>
        </friend-card>
      </el-checkbox>
      <div class="friend" @click="addNewFriend" v-if="activeSection === 'public'">
        <friend-card-empty></friend-card-empty>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
import FriendCard from "@/components/friend/FriendCard";
import QueryGroup from "@/components/form/QueryGroup";
import FriendCardEmpty from "@/components/friend/FriendCardEmpty";
import {updateFriend,deleteFriend,findFriendBy} from "@/api/friend";

export default {
  name: "index",
  components: {FriendCardEmpty, QueryGroup, FriendCard},
  data(){
    return{
      activeSection: 'public',
      friends: [],
      count: {
        public: '?',
        pending: '?'
      },
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
      this.query.status = tab.$attrs.query.status;
      this.refresh();
    },
    saveFriend(friend){
      // 后台新增好友默认为通过状态
      if(friend.status === null || friend.status === undefined){
        friend.status = 1;
      }
      this.disableFriendCommit = true;
      updateFriend(friend).then(() => {
        this.$message.success('保存成功')
        this.refresh();
      }).finally(() => {
        this.disableFriendCommit = false;
      })
    },
    pass(friend){
      friend.status = 1;
      updateFriend(friend).then(() => {
        this.$message.success('操作成功')
        this.refresh();
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    deleteFriend(id){
      if(!id) return;
      if(id[0]){
        this.$confirm(`确定删除id：${id} 吗`,'提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.disableFriendCommit = true;
          deleteFriend(id).then(() => {
            this.$message.success('删除好友成功');
            this.refresh();
          }).finally(() => {
            this.disableFriendCommit = false
          })
        }).catch(() => {})
      } else {
        this.friends.pop()
      }
    },
    addNewFriend(){
      if(!this.friends.length || this.friends[this.friends.length - 1].id){
        this.friends.push({id: null})
      }
    },
    refresh(){
      findFriendBy(this.query).then(data => {
        this.friends = data.friends;
        this.count = data.count;
      }).catch(error => {
        this.$message.error(error.message);
      })
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.pluto-friend{
  .friend-wrapper ::v-deep{
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
