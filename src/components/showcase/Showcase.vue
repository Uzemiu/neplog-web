<template>
  <section class="flex-section">

    <div class="filter-btns"
         :class="{'collapse':collapseFilter}">
      <div class="flex-wrapper">
        <button
          class="filter-btn"
          :class="{'active':activeTags.size === 0}"
          @click="activeButton('all')">All
        </button>
        <button
          class="filter-btn"
          v-for="tag in tags"
          :key="tag"
          @click="activeButton(tag)"
          :class="{'active':isButtonActive(tag)}">
          {{tag}}
        </button>
      </div>
      <div class="divider"></div>
      <div class="collapse-wrapper">
        <button
          class="collapse-btn"
          @click="toggleCollapse">
          <span></span>
          <span class="fa fa-angle-up"></span>
        </button>
      </div>
    </div>

    <div class="showcases">
      <card
        v-for="post in posts"
        :key="post.id"
        :postId="post.id"
        :cover="post.cover"
        :tags="post.tags">

      </card>
    </div>
  </section>
</template>

<script>
import Card from "@/components/showcase/Card";

export default {
  name: "Showcase",
  components: {
    Card
  },
  data(){
    return {
      collapseFilter: false,
      activeTracker: 1,
      activeTags: new Set(),
      tags: [],
      posts: []
    }
  },
  methods: {
    activeButton(tag){
      this.activeTracker+=1;
      if(tag.toLowerCase() === 'all'){
        this.activeTags.clear();
      } else if(this.activeTags.has(tag)){
        this.activeTags.delete(tag);
      } else {
        this.activeTags.add(tag);
      }
    },
    toggleCollapse(){
      this.collapseFilter = !this.collapseFilter;
    },
    isButtonActive(tag){
      return this.activeTracker && this.activeTags.has(tag);
    }
  },
  computed:{
  },
  mounted() {
    this.tags = ['Web','Java','Html','C++',
                'Csharp','作业','JuanG','Eavier',
                'Neptunia','Uzemiu','算法'];
    this.posts = [{
      id: 1,
      tags: ['Web','Java','Html'],
      cover: require('../../assets/imgs/71767472_p0.jpg'),
      title: 'nihao1'
    },{
      id: 2,
      tags: ['Web','Java'],
      cover: require('../../assets/imgs/75977007_p0.jpg'),
      title: 'nihao1'
    },{
      id: 3,
      tags: ['Web'],
      cover: require('../../assets/imgs/75706567_p0.jpg'),
      title: 'nihao1'
    },{
      id: 4,
      tags: [],
      cover: require('../../assets/imgs/QQ图片20201110135305.jpg'),
      title: 'nihao1'
    }];
  }
}
</script>

<style lang="scss" scoped>
.flex-section{
  display: grid;
  justify-items: center;
  max-width: unset;
  padding: 0;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);

  .filter-btns{
    padding: 10px;
    margin-bottom: 12px;
    width: 100%;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
    transition: 0.4s ease-in-out;
    max-width: 80vw;

    .flex-wrapper{
      max-width: unset;
      display: flex;
      flex-wrap: nowrap;
      transition: .4s ease-in-out;
      max-height: 57px;
      overflow-x: auto;
      overflow-y: hidden;

      &::-webkit-scrollbar{
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,.1);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
        //background-color: white;
      }
    }

    .collapse-wrapper{
      height: 20px;
      text-align: center;
      transition: .4s ease-in-out;
      padding: 5px 5px;

      .collapse-btn{
        width: 100%;
        border: 0;
        background-color: rgba(0,0,0,0);
        cursor: pointer;
        .fa{
          font-size: 20px;
          transform: translateY(-4px);
          transition: .4s ease-in-out;
        }
        span{
          vertical-align: top;
        }
      }
    }

    &.collapse {
      padding-top: 0;
      overflow: hidden;
      .flex-wrapper{
        max-height: 0;
      }
      .collapse-wrapper .fa{
        transform: rotate(180deg) translateY(2px);
      }
    }

    button{
      &:focus, &:active{
        outline: none;
      }
    }

    .filter-btn{
      flex-shrink: 0;
      margin: 3.5px 6px 3.5px 6px;
      background-color: var(--secondary-color);
      border: 0;
      color: var(--text-color-dark-gray);
      padding: 8px 18px;
      border-radius: 4px;
      transition: .4s ease-in-out;
      cursor: pointer;

      &.active{
        background-color: var(--primary-color);
        color: white;
      }
      &:hover{

      }
    }

  }

  .showcases{
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 992px) {
  .flex-section{
    .showcases{
      width: 96vw;
    }
    .filter-btns{
      max-width: 96vw;
    }
  }

}
@media (max-width: 768px){
}
@media (max-width: 576px){

}


</style>
