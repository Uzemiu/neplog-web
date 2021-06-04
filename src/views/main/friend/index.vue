<template>
  <div class="content-wrapper">
    <glide :glides="glides"></glide>

    <responsive class="friend-list">
      <div class="description">
        <p>੭ ᐕ)੭*⁾ 欢迎来到Nep's friends</p>
        <p>想要成为朋友的话点击下面的"+"填写个人信息提交之后</p>
        <p>经过博主审核就会在下面显示哦~</p>
        <p>暂时没有任何交换限制</p>
        <p>PS：头像地址只支持Https</p>
      </div>
      <h3 class="header sharp-header">Nep's friends</h3>
      <div class="friends">
        <ul>
          <li class="friend"
            v-for="(friend,i) in friends"
            :key="i">
            <friend-card :friend="friend"></friend-card>
          </li>
        </ul>
      </div>
      <h3 class="header sharp-header">friends++</h3>

      <div class="friends">
        <ul>
          <li class="friend" v-if="creating">
            <friend-card
                :friend="newFriend"
                :disable-commit="disableFriendCommit"
                :enable-edit="enableEdit"
                ref="friend"
                @completeEdit="createNewFriend">
            </friend-card>
          </li>
          <li class="friend" @click="toggleCreating" v-else>
            <friend-card-empty></friend-card-empty>
          </li>
        </ul>
      </div>
    </responsive>
  </div>
</template>

<script>
import Glide from "@/components/glide/index"
import FriendCard from "../../../components/friend/FriendCard";
import Responsive from "../../../components/layout/Responsive"
import FriendCardEmpty from "@/components/friend/FriendCardEmpty";
import {createFriend, listFriendView} from "@/api/friend";
import GlideConfig from "@/config/glide";

export default {
  name: "index",
  components: {
    FriendCardEmpty,
    Glide,
    FriendCard,
    Responsive
  },
  data(){
    return{
      friends: [],
      glides: [GlideConfig.glideFromKey('friend')],
      newFriend: {},
      enableEdit: true,
      creating: false,
      disableFriendCommit: false
    }
  },
  methods: {
    toggleCreating(){
      this.creating = true;
      this.$nextTick(() => {
        this.$refs.friend.editing = true;
      })
    },
    createNewFriend(friend, callback){
      this.disableFriendCommit = true;
      createFriend(friend).then(() => {
        this.$message.success("已提交好友申请")
        callback(true)
        this.enableEdit = false
      }).catch(() => {
        this.disableFriendCommit = false;
      })
    }
  },
  mounted() {
    listFriendView().then(data => {
      this.friends = data.content;
    }).catch(() => {})
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2e2e2e;

  .friend-list{
    .header{
      margin: 20px 0 10px 0;
      font-size: 30px;
    }
    .friends{
      width: 100%;

      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }
    .friend{
      margin: 5px;
      width: 32%;
    }
  }
}

@media (max-width: 992px) {
  .content-wrapper{
    .friend-list{
      .friends{
        .friend{
          width: calc(50% - 10px);
        }
      }
    }
  }
}
@media (max-width: 576px){
  .content-wrapper{
    .friend-list{
      padding: 0 3%;
      .friends{
        .friend{
          width: 100%;
        }
      }
    }
  }
}
</style>
