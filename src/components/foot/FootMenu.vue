<template>
  <ul class="foot-menu"
      :style="{'bottom':scrollTop}">
    <li>
      <i class="fa fa-chevron-up"
         @click="scrollToTop"></i>
    </li>
  </ul>
</template>

<script>
export default {
name: "index",
  data(){
    return {
      scrollTop: '-40px',
      readyToScroll: false
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

.foot-menu{
  display: flex;
  right: 27px;
  position: fixed;
  z-index: 234;
  transition: .4s ease-in-out;

  li{
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--primary-green);
    color: white;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
