<template>
  <div class="pluto-friend">
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

    <crud-operation
      crud="cud"
      @create="createFriend"
      update-text="通过"
      :update-disabled="selected.length===0 || query.status===1"
      @delete="deleteFriend(selected)"
      :delete-disabled="selected.length===0">
    </crud-operation>

    <el-table
      v-loading="loading"
      :data="friends"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <el-table-column
        label="头像"
        width="90">
        <template slot-scope="{row}">
          <img :src="row.avatar" :alt="row.name"
               style="height: 80px;width:80px;object-fit: scale-down">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="简介"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="{row}">
          <el-button
            type="text"
            size="small"
            @click="deleteFriend([row])">
            移除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="editFriend(row)">
            编辑
          </el-button>
          <el-button
            v-if="query.status===0"
            type="text"
            size="small"
            @click="pass([row])">
            通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="display: flex;justify-content: center"
      :hide-on-single-page="false"
      @current-change="handleCurrentChange"
      :pager-count="5"
      :page-size="query.size"
      :current-page="query.page+1"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      class="edit-friend-dialog serif-sc"
      title="编辑好友"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true"
      :lock-scroll="false"
      max-width="100%">
      <friend-card :friend="editingFriend" style="margin-bottom: 20px"></friend-card>
      <el-form :model="editingFriend" label-width="80px" label-position="left">
        <el-form-item label="友链头像:">
          <el-input v-model="editingFriend.avatar"></el-input>
        </el-form-item>
        <el-form-item label="友链链接:">
          <el-input v-model="editingFriend.link"></el-input>
        </el-form-item>
        <el-form-item label="友链名称:">
          <el-input v-model="editingFriend.name"></el-input>
        </el-form-item>
        <el-form-item label="友链介绍:">
          <el-input
            type="textarea"
            v-model="editingFriend.introduction"
            rows="2"
            maxlength="420"
            resize="none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="updateFriend">确 定</el-button>
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QueryGroup from "@/components/form/QueryGroup";
import CrudOperation from "@/components/form/CrudOperation";
import {updateFriend, deleteFriend, queryFriendBy, countByLabel, updateStatus} from "@/api/friend";
import query from "@/mixins/query";
import FriendCard from "@/components/friend/FriendCard";

export default {
  name: "PlutoFriend",
  components: {FriendCard, CrudOperation, QueryGroup},
  mixins:[query],
  data(){
    return{
      dialogVisible: false,
      activeSection: 'public',
      editingFriend: {},
      friends: [],
      count: {
        public: '--',
        pending: '--'
      },
      selected: [],
      query: {
        status: 1,
        size: 10,
        page: 0
      },
      total: 0,
      loading: true,
      testObj:{
        obj: {
          v1: 1,
          v2: 2
        },
        e1: 1
      },
      editingObj:{
        obj: {
          v1: 1,
          v2: 2
        },
        e1: 1
      }
    }
  },
  methods:{
    changeSection(tab){
      this.activeSection = tab.name;
      this.query.status = tab.$attrs.query.status;
      this.refresh();
    },
    handleSelectionChange(val){
      this.selected = val;
    },
    pass(friends){
      const ids = friends.map(friend => friend.id);
      updateStatus(ids).then(() => {
        this.$message.success('操作成功')
        this.refresh();
      }).catch(() => {})
    },
    createFriend(){
      // 后台新增好友默认为通过状态
      this.editingFriend = {
        status: 1
      };
      this.dialogVisible = true;
    },
    updateFriend(){
      updateFriend(this.editingFriend).then(() => {
        this.$message.success('保存成功')
        this.dialogVisible = false;
        this.refresh();
      }).catch(() => {})
    },
    editFriend(friend){
      let tmp = {};
      Object.assign(tmp, friend)
      this.editingFriend = tmp;
      this.dialogVisible = true;
    },
    deleteFriend(friends){
      const ids = friends.map(friend => friend.id);
      let tip = friends.slice(0,3).map(friend => friend.name).join(', ');
      if(friends.length > 3){
        tip += `等共${friends.length}个好友`
      }
      this.$confirm(`确定删除${tip}吗`,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteFriend(ids);
      }).then(() => {
        this.$message.success('删除好友成功');
        this.refresh();
      }).catch(() => {})
    },
    refresh(){
      this.selected = [];
      this.loading = true;
      queryFriendBy(this.query).then(data => {
        this.friends = data.content;
        this.total = data.total;
      }).catch(() => {}).finally(() => {
        this.loading = false;
      })
      countByLabel().then(data => {
        this.count = data;
      }).catch(() => {})
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.pluto-friend{
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

  .edit-friend-dialog .el-input{
    font-family: "Noto Serif SC", serif;
  }
}

</style>
