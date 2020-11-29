<template>
  <div class="content-wrapper">
    <glide></glide>

    <showcase class="friend-list">
      <div class="description">欢迎来到</div>
      <h2 class="header sharp-header">友達</h2>
      <div class="friends">
        <ul>
          <li class="friend"
            v-for="(friend,i) in friends"
            :key="i">
            <friend
                :name="friend.name"
                :intro="friend.intro"
                :link="friend.link"></friend>
          </li>
        </ul>
      </div>
    </showcase>

    <section>

    </section>

  </div>
</template>

<script>
import Glide from "@/components/glide/index"
import Friend from "./FriendCard";
import Showcase from "../../components/showcase/index"
export default {
  name: "index",
  components: {
    Glide,
    Friend,
    Showcase
  },
  data(){
    return{
      friends: [{
        name: 'Nobody',
        intro: 'Here is my friend, nobodyboboboboboboboddddddd',
        link: 'github.com/Uzemiu'
      },{
        name: 'Uzemiu',
        intro: 'Another nep',
        link: '/friends'
      },{
        name: 'Uzemiu',
        intro: 'Another nep',
        link: '/friends'
      },{
        name: 'Uzemiu',
        intro: 'Another nep',
        link: '/friends'
      },{
        name: 'Uzemiu',
        intro: 'Another nep',
        link: '/friends'
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
