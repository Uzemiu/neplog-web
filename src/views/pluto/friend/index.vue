<template>
  <div class="pluto-friend">
    <h2 class="sharp-header">友链管理</h2>
    <el-collapse v-model="activeSection">
      <el-collapse-item title="待审核" name="pendingReview">
          <friend-card enable-edit="true">

          </friend-card>
      </el-collapse-item>
      <el-collapse-item title="已通过" name="public">

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import FriendCard from "@/components/friend/FriendCard";
export default {
  name: "index",
  components: {FriendCard},
  data(){
    return{
      activeSection: 'pendingReview',
      friends: []
    }
  },
  methods:{
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
  }
}
</style>
