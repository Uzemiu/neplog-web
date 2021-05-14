<template>
  <div class="pluto-friend" v-loading="loading">
    <h2 class="sharp-header">友链管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane :label="`我的好友(${count.public})`" name="public" :query="{status: 1}"></el-tab-pane>
      <el-tab-pane :label="`待审核(${count.pending})`" name="pending" :query="{status: 0}"></el-tab-pane>
    </el-tabs>

    <query-group @search="refresh">
      <el-form-item size="small">
        <el-input
          style="width: 160px"
          type="text"
          v-model="query.name"
          placeholder="输入好友名或简介"></el-input>
      </el-form-item>
    </query-group>

    <crud-operation crud="ud" :multi-select="multipleSelect" @delete="deleteInBatch">
      <el-checkbox v-model="multipleSelect">批量修改</el-checkbox>
    </crud-operation>

    <el-checkbox-group
      v-model="selected"
      :disabled="!multipleSelect"
      @change="preventNull">
      <transition-group
        class="friend-wrapper"
        name="friends"
        tag="ul">
        <li v-for="friend in friends" :key="String(friend.id)" class="friend">
          <el-checkbox :label="friend">
            <friend-card
              :enable-edit="true"
              :friend="friend"
              @completeEdit="createFriend">
              <el-dropdown-item v-if="friend.status === 0" slot="operation" :disabled="disableFriendCommit">
                <span @click="pass(friend)">通过</span>
              </el-dropdown-item>
              <el-dropdown-item slot="operation" :disabled="disableFriendCommit">
                <span @click="deleteSingle(friend)">删除</span>
              </el-dropdown-item>
            </friend-card>
          </el-checkbox>
        </li>
        <li class="friend"
            key="newFriend"
            @click="addNewFriend"
            v-if="activeSection === 'public'">
          <friend-card-empty></friend-card-empty>
        </li>
      </transition-group>

    </el-checkbox-group>
  </div>
</template>

<script>
import FriendCard from "@/components/friend/FriendCard";
import QueryGroup from "@/components/form/QueryGroup";
import FriendCardEmpty from "@/components/friend/FriendCardEmpty";
import CrudOperation from "@/components/form/CrudOperation";
import {updateFriend,deleteFriend,queryBy} from "@/api/friend";

export default {
  name: "PlutoFriend",
  components: {CrudOperation, FriendCardEmpty, QueryGroup, FriendCard},
  data(){
    return{
      activeSection: 'public',
      friends: [],
      count: {
        public: '--',
        pending: '--'
      },
      selected: [],
      query: {
        status: 1,
      },
      multipleSelect: false,
      disableFriendCommit: false,
      loading: true
    }
  },
  methods:{
    changeSection(tab){
      this.activeSection = tab.name;
      this.query.status = tab.$attrs.query.status;
      this.refresh();
    },
    createFriend(friend, callback){
      // 后台新增好友默认为通过状态
      if(friend.status === null || friend.status === undefined){
        friend.status = 1;
      }
      this.disableFriendCommit = true;
      updateFriend(friend).then(() => {
        this.$message.success('保存成功')
        callback(true);
        this.refresh();
      }).catch(() => {

      }).finally(() => {
        this.disableFriendCommit = false;
      })
    },
    pass(friend){
      friend.status = 1;
      updateFriend(friend).then(() => {
        this.$message.success('操作成功')
        this.refresh();
      }).catch(() => {})
    },
    deleteSingle(friend){
      if(!friend) return;
      if(friend.id){
        this.deleteFriend([friend.id],friend.name);
      } else {
        this.friends.pop()
      }
    },
    deleteInBatch(){
      const names = this.selected.map(friend => friend.name).slice(0,3);
      const ids = this.selected.map(friend => friend.id);
      this.deleteFriend(ids,`${names}等共${this.selected.length}个好友`);
    },
    deleteFriend(ids,tip){
      this.$confirm(`确定删除${tip}吗`,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.disableFriendCommit = true;
        return deleteFriend(ids);
      }).then(() => {
        this.$message.success('删除好友成功');
        this.refresh();
      }).catch(() => {}).finally(() => {
        this.disableFriendCommit = false
      })
    },
    preventNull(selected){
      if(selected.length && !selected[selected.length - 1].id){
        selected.pop();
      }
    },
    addNewFriend(){
      if(!this.friends.length || this.friends[this.friends.length - 1].id){
        this.friends.push({id: null})
      }
    },
    refresh(){
      this.loading = true;
      queryBy(this.query).then(data => {
        this.friends = data.friends;
        this.count = data.count;
      }).catch(() => {}).finally(() => {
        this.loading = false;
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
    //display: inline-block;
    width: calc(25% - 10px);
    .el-checkbox{
      width: 100%;
    }
  }

  /**
   * 过渡动画
   */
  .friends-enter-active,
  .friends-leave-active{
    transition: all .5s;
  }
  .friends-enter, .friends-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
  .friends-leave-active{
    position: absolute;
  }
  .friends-move{
    transition: transform .5s;
  }
}

@media (max-width: 1479px){
  .pluto-friend .friend{
    width: calc(33% - 10px);
  }
}

@media (max-width: 1024px) {
  .pluto-friend .friend{
    width: calc(50% - 10px);
  }
}

@media (max-width: 576px) {
  .pluto-friend .friend{
    width: 100%;
  }
}
</style>
