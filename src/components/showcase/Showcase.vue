<template>
  <section class="flex-section">

    <!--
    <div class="filter-btns"
         :class="{'collapse':collapseFilter}">

      <div class="search-group">
        <filter-group
            class="general-filter"
            :filter-tag="'最近更新'"
            :tags="generalFilterTags"
            ref="generalFilter">
        </filter-group>
        <button
            slot="search"
            class="filter-btn search-btn">搜索</button>
      </div>

      <filter-group
          :filter-tag="'All Categories'"
          :tags="categories"
          ref="categoryFilter"/>
      <filter-group
          :filter-tag="'All Tags'"
          :tags="tags"
          :multi-choice="true"
          ref="tagFilter"/>

      <div class="collapse-button">
        <button
          class="collapse-btn"
          @click="toggleCollapse">
          <span></span>
          <span class="fa fa-angle-up"></span>
        </button>
      </div>

    </div>
    -->

    <div class="showcases">
      <card
        v-for="article in articles"
        :key="article.id"
        :postId="article.id"
        :title="article.title"
        :cover="article.cover"
        :tags="article.tags"
        :create-date="article.createDate"
        :summary="article.summary">
      </card>
    </div>

    <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :pager-count="5"
        :page-size="10"
        :total="500"
        @current-change="handlePageChange">

    </el-pagination>
  </section>
</template>

<script>
import Card from "./Card";
// import FilterGroup from "./filter/FilterGroup";

export default {
  name: "Showcase",
  components: {
    Card,
    // FilterGroup
  },
  data(){
    return {
      collapseFilter: true,
      generalFilterTags: ['浏览最多','评论最多','点赞最多'],
      tags: [],
      categories: [],
      articles: []
    }
  },
  methods: {
    toggleCollapse(){
      this.collapseFilter = !this.collapseFilter;
    },
    handlePageChange(val){
      console.log(val)
    }
  },
  computed:{
  },
  mounted() {
    this.articles = [{
      id: 1,
      tags: ['Home','Java','Html','TESTTAGSTESTTAGSTEST'],
      category: '首页',
      cover: require('../../assets/imgs/71767472_p0.jpg'),
      title: '首页施工中...',
      createDate: '2020-11-15',
      summary: '94.666666666666666666666666666666ddddddddddddddd%...'
    },{
      id: 2,
      tags: ['Article','Java'],
      category: '文章',
      cover: require('../../assets/imgs/75977007_p0.jpg'),
      title: '文章页面施工中...'
    },{
      id: 3,
      tags: ['links'],
      category: '友情链接',
      cover: require('../../assets/imgs/71773962_p0.jpg'),
      title: '友情链接施工中...'
    },{
      id: 4,
      tags: ['about'],
      cover: require('../../assets/imgs/QQ图片20201110135305.jpg'),
      category: '关于我',
      title: '个人页面施工中...'
    }];
    let set = new Set();
    this.categories.splice(0,this.categories.length);
    this.articles.forEach(post => {
      post.tags.forEach(t => set.add(t));
      this.categories.push(post.category);
    })
    this.tags.splice(0,this.tags.length);
    this.tags.push(...set);
  }
}
</script>

<style lang="scss" >
.flex-section{
  display: grid;
  justify-items: center;
  max-width: unset;
  padding: 0;
  //box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);

  .filter-btns{
    padding: 10px;
    margin-bottom: 12px;
    width: 100%;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
    transition: 0.4s ease-in-out;
    max-width: 90vw;

    .collapse-button{
      height: 10px;
      text-align: center;
      transition: .4s ease-in-out;
      padding: 0 5px;

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
      overflow: hidden;
      .flex-wrapper:nth-of-type(n+2){
        max-height: 0;
        padding: 0;
      }
      .collapse-button .fa{
        transform: rotate(180deg) translateY(2px);
      }
    }

    button{
      &:focus, &:active{
        outline: none;
      }
    }

    .flex-wrapper:first-of-type{
      padding-top: 0;
      &:before{
        content: none;
      }
    }

    .filter-btn{
      flex-shrink: 0;
      margin: 3.5px 6px 3.5px 6px;
      background-color: var(--secondary-color);
      border: 0;
      color: var(--text-color-dark-gray);
      padding:6px 14px;
      border-radius: 4px;
      transition: .4s ease-in-out;
      cursor: pointer;

      &.active{
        background-color: var(--primary-color);
        color: white;
      }
    }

    .search-group{
      display: flex;
      .general-filter{
        max-width: calc(96vw - 90px);
      }
      .search-btn{
        margin-left: auto;
        background-color: #0097e6;
        color: #fff;
        height: 29px;
      }
    }



  }

  .showcases{
    width: 90vw;
    display: flex;
    flex-wrap: wrap;
  }

  .pagination{
    padding: 10px 0;
  }
}

@media (max-width: 1410px){
  .flex-section{
    .showcases{
      flex-direction: column;
      align-items: center;
    }
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
