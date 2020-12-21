<template>
  <div class="content-wrapper">
    <glide></glide>

    <responsive class="friend-list">
      <div class="description">欢迎来到</div>
      <h2 class="header sharp-header">友達</h2>
      <div class="friends">
        <ul>
          <li class="friend"
            v-for="(friend,i) in friends"
            :key="i">
            <friend :friend="friend"></friend>
          </li>
        </ul>
      </div>
    </responsive>

  </div>
</template>

<script>
import Glide from "@/components/glide/index"
import Friend from "../../components/friend/FriendCard";
import Responsive from "../../components/layout/Responsive"
export default {
  name: "index",
  components: {
    Glide,
    Friend,
    Responsive
  },
  data(){
    return{
      friends: [{
        avatar: require("@/assets/imgs/tomorinao.jpg"),
        name: 'Nobodydddddddddddddddd',
        intro: 'Here is my friend, nobodyboboboboboboboddddddd',
        link: 'github.com/Uzemiu'
      }]
    }
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
      font-size: 36px;
    }
    .friends{
      width: 100%;

      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .friend{
        margin: 5px;
        width: 32%;
      }
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
