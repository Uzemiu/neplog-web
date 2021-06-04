<template>
  <div class="archive">
    <glide :glides="glides"></glide>

    <div class="list-wrapper">
      <responsive class="archive-article">

        <ul>
          <li v-for="group in articles" :key="group.date">
            <h2><i class="fa fa-calendar-check-o"></i>{{group.date}}</h2>
            <ul class="article-date-group">
              <li
                class="article-date-group-item"
                v-for="article in group.articles"
                :key="article.id">
                <router-link :to="`/article/${article.id}`">
                  <span>{{article.title}}</span>
                  <time>{{article.createTime}}</time>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <el-pagination
          style="display: flex;justify-content: center"
          :pager-count="5"
          :page-size="query.size"
          :current-page="query.page+1"
          @current-change="handleCurrentChange"
          hide-on-single-page
          :total="total"
          layout="prev, pager, next">

        </el-pagination>
      </responsive>
    </div>
  </div>
</template>

<script>
import Glide from "@/components/glide/index";
import GlideConfig from "@/config/glide";
import Responsive from "@/components/layout/Responsive";
import {queryArticleBy} from "@/api/article";

export default {
  name: "Archive",
  components: {Responsive, Glide},
  data(){
    return {
      glides: [GlideConfig.glideFromKey('archive')],
      articles: [],
      query: {
        size: 10,
        page: 0
      },
      total: 0
    }
  },
  methods: {
    groupByDate(articles){
      let res = [];
      articles.forEach(article => {
        let dateStr = article.createTime.substr(0, article.createTime.lastIndexOf('-'));
        let i = res.findIndex(str => str.date === dateStr);
        if(i<0){
          i = res.length;
          res.push({
            date: dateStr,
            articles: []
          })
        }
        res[i].articles.push(article)
      })
      return res;
    },
    listArchive(){
      queryArticleBy(this.query).then(data => {
        this.total = data.total;
        this.articles = this.groupByDate(data.content);
      }).catch(() => {})
    },
    handleCurrentChange(val){
      this.query.page = val - 1;
      this.listArchive();
    }
  },
  mounted() {
    this.listArchive();
  }
}
</script>

<style lang="scss" scoped>
.archive{
  display: flex;
  justify-content: center;
  flex-direction: column;

  .list-wrapper{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .archive-article{
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07);
    padding: 30px 40px;

    h2{
      color: var(--vscode-annotation);
    }
    .fa{
      padding-right: .625em;
    }
  }

  .article-date-group{
    font-size: 16px;
  }
  .article-date-group-item{
    padding: 10px 1em 10px 2em;
    transition: .3s;

    a{
      position: relative;
      color: #8b8b8b;
      transition: .3s;
      width: 100%;

      &:after{
        content: "";
        clear: both;
        display: block;
      }
    }
    time{
      float: right;
      padding-left: 20px;
      transition: .1s;
    }

    &:hover{
      a{
        color: #8dc9c2;
      }
      background-color: #f1f7ff;
    }
  }
}

@media (max-width: 568px) {
  .archive .archive-article{
    padding: 15px 20px;
  }
}
</style>
