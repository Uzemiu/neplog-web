<template>
  <div class="about">
    <glide :glides="glide"></glide>

    <div class="content-wrapper">
      <responsive class="about-info">
        <div>
          <img
            class="blog-avatar"
            :src="$store.getters.blogConfig.blogAvatar"
            alt="blog-avatar">
        </div>
        <h2>{{$store.getters.authorName}}</h2>

        <div class="description" v-html="description.about_description_html">
        </div>

        <div class="links">

          <a v-for="link in links"
             :key="link.name"
             :href="link.href"
             target="_blank">
            <i :class="['iconfont',linkMap[link.name]]"></i>
          </a>

          <i class="icon-bil"></i>

        </div>
      </responsive>
    </div>
  </div>
</template>

<script>
import Glide from "@/components/glide/index";
import GlideConfig from "@/config/glide";
import Responsive from "@/components/layout/Responsive";
import {getAboutProperty} from "@/api/property";

export default {
  name: "About",
  components: {Responsive, Glide},
  data(){
    return{
      glide:[{img: GlideConfig.aboutPageImage,title: '关于'}],
      linkMap: {
        about_github: 'icon-github-alt',
        about_gitee: 'icon-gitee',
        about_wechat: 'icon-wechat',
        about_zhihu: 'icon-zhihu',
        about_jianshu: 'icon-jianshu',
        about_csdn: 'icon-csdn',
        about_weibo: 'icon-weibo',
        about_linkedin: 'icon-linkedin',
        about_qq: 'icon-qq',
        about_bilibili: 'icon-bilibili-alt',
      },
      linkOrder: {
        about_github: 10,
        about_gitee: 20,
        about_csdn: 30,
        about_zhihu: 40,
        about_jianshu: 50,
        about_linkedin: 60,
        about_wechat: 70,
        about_weibo: 80,
        about_qq: 90,
        about_bilibili: 100,
      },
      description: {
        about_description_html: ''
      },
      links: []
    }
  },
  methods: {
    refresh(){
      getAboutProperty().then(data => {
        let links = [];
        for(let k of Object.keys(data)){
          if(k.startsWith('about_description')){
            // 个人介绍description不加入网站链接
            this.description[k]=data[k];
          }else{
            links.push({name: k, href:data[k]});
          }
        }
        links.sort((a,b) => this.linkOrder[a.name] > this.linkOrder[b.name] ? 1 : -1);
        this.links = links;
      })
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>

<style lang="scss" scoped>
.about{
  .content-wrapper{
    margin-top: -47px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .about-info{
    z-index: 51;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 60px;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07);
  }
  .blog-avatar{
    margin-top: -110px;
    border-radius: 50%;
    width: 160px;
  }
  .description{
    margin-top: 1em;
    word-wrap: anywhere;
    text-align: center;
  }
  .links{
    margin-top: 1.5em;
    vertical-align: bottom;

    .iconfont{
      font-size: 24px;
      padding: 0 6px;
    }
  }
}
</style>
