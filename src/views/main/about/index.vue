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

        <div class="description">
          <p>nihaozhelisd</p>
          <p>ddddddd<strong>ddddddddddddd</strong>dddddddadasdasdsadsaddsdsdsdsdsdsdsdsdsdsdsdsddddddddddddddddddddddhi</p>
          <span>pppp</span>
        </div>

        <div class="links">

          <el-tooltip effect="dark" content="Github" placement="top">
            <a href="" target="_blank">
              <i class="fab fa-github-alt"></i>
            </a>
          </el-tooltip>

          <el-tooltip effect="dark" content="Weixin" placement="top">
            <a href="" target="_blank">
              <i class="fab fa-weixin"></i>
            </a>
          </el-tooltip>

          <a href="" target="_blank">
            <i class="fab fa-weixin"></i>
          </a>

          <el-tooltip effect="dark" content="Weixin" placement="top">
            <a href="" target="_blank">
              <i class="f"></i>
            </a>
          </el-tooltip>

          <i class="fab fa-weibo"></i>
          <i class="fa fab fa-envelope"></i>
          <i class="fab fa fa-qq"></i>
          <i class="fab fa-zhihu"></i>
          <i class="fab fa-linkedin"></i>
          <i class="fab fa-steam"></i>
          <i class="fab fa-stack-overflow"></i>
          <i class="fab fa-bilibili"></i>
        </div>
      </responsive>
    </div>
  </div>
</template>

<script>
import Glide from "@/components/glide/index";
import GlideConfig from "@/config/glide";
import Responsive from "@/components/layout/Responsive";

export default {
  name: "About",
  components: {Responsive, Glide},
  data(){
    return{
      glide:[{
        img: GlideConfig.aboutPageImage,
        title: '关于'
      }],
      links: [{
        link: '',
        tooltip: '',
      }]
    }
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
    margin-top: 1.5em;
    word-wrap: anywhere;
    text-align: center;
  }
  .links{
    margin-top: 1.5em;

    .fa,.fab{
      font-size: 24px;
      padding: 0 6px;
    }
  }
}
</style>
