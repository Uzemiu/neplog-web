<template>
  <footer>
    <div class="footer-menus">
      <p class="icp-info">
        <a href="http://beian.miit.gov.cn/" class="icp-link">沪ICP备20004108号</a>
      </p>
      <div class="scrollToTop" >
        <i class="fa fa-chevron-up"
           :style="{'bottom': scrollTop}"
           @click="scrollToTop"></i>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "foot",
  data(){
    return {
      scrollTop: '-40px'
    }
  },
  methods: {
    changeScrollTop(){
      this.scrollTop = window.pageYOffset > 200 ? '27px' : '-40px';
    },
    scrollToTop(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener('scroll',this.changeScrollTop)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.changeScrollTop)
  }
}
</script>

<style lang="scss" scoped>
  footer{
    margin-top: 80px;
    background-color: #181818;
    display: grid;
    justify-items: center;

    .icp-info{
      margin: 10px 0;
      color: #fff;
      .icp-link{
        color: #fff;
        font-size: 13px;
      }
    }

    .scrollToTop i{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: coral;
      color: white;
      text-decoration: none;
      position: fixed;
      bottom: -40px;
      right: 27px;
      cursor: pointer;
      transition: .4s ease-in-out;
      z-index: 234;
    }
  }
</style>
