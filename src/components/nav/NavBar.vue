<template>
  <header
    id="header"
    :class="{'sticky':stickyHeader || open, open}"
    ref="header">
    <div class="top-header header-item">
      <div class="logo">Neplog</div>
      <nav class="top-nav">
        <ul>

        </ul>
        <router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/team">团队</router-link>
        <i class="fa fa-search"></i>
      </nav>
      <div class="burger" @click="openTopBar">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
      </div>
    </div>

    <div class="open-header header-item" ref="openHeader">

    </div>

  </header>
</template>

<script>
export default {
  name: "NavBar",
  data(){
    return {
      stickyHeader: false,
      open: false
    }
  },
  methods: {
    changeStickyHeader(){
      let height = this.$refs.header.getBoundingClientRect().height;
      this.stickyHeader = window.pageYOffset - height > 40;
    },
    openTopBar(){
      this.open = !this.open;
    }
  },
  computed: {

  },
  mounted() {
    window.addEventListener('scroll',this.changeStickyHeader)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.changeStickyHeader)
  }
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/font-awesome/css/font-awesome.min.css";
@import "../../../node_modules/hamburgers/dist/hamburgers.css";
header{
  width: 100%;
  height: 47px;
  max-height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  z-index: 200;
  transition: .4s ease-in-out;
  font-family: 'Play';


  .header-item{
    padding: 0 40px;
  }

  .top-header{

    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;

    nav{
      justify-self: end;

      i{
        color: var(--text-color-lightest);
      }

      a{
        color: var(--text-color-lightest);
        text-decoration: none;
        margin: 0 24px;
      }
    }

    .burger{
      display: none;
      position: relative;

      &:before{
        content: "";
        display: block;
        position: absolute;
        top: -3px;
        width: 20px;
        height: 14px;
      }

      .burger-line1,
      .burger-line2,
      .burger-line3{
        width: 20px;
        height: 2px;
        background-color: var(--text-color-lightest);
        transition: .4s ease;
      }
      .burger-line1{
        position: absolute;
        top: -3px
      }
      .burger-line2{
        position: absolute;
        top: 3px;
      }
      .burger-line3{
        position: absolute;
        top: 9px;
      }
    }

    .logo{
      font-size: 24px;
      font-weight: 600;
      color: var(--text-color-lightest);
    }
  }

  .open-header{
    max-height: 0;
    width: 100%;
    height: 100px;
    background-color: rgba(255,255,255,1);
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    transition: .4s ease-in-out;
  }

  &.sticky{
    position: sticky;
    top: 0;
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 18px rgba(0,0,0,0.2);

    .burger-line1,
    .burger-line2,
    .burger-line3{
      transition: .4s ease;
    }

    .top-nav,{
      a,i{
        transition: .4s;
        color: var(--text-color-dark)
      }
    }
    .logo{
      color: var(--text-color-darker)
    }
  }

  &.open, &.delay-open{
    .burger-line1 {
      transform: rotate(45deg) translate(3px, 5px);
    }
    .burger-line2 {
      transform: translateX(5px);
      opacity: 0;
    }
    .burger-line3 {
      transform: rotate(-45deg) translate(3px, -5px);
    }

    .top-header{
      box-shadow: none;
    }
    .open-header{
      max-height: 100px;
    }
  }

  //&.open{
  //  .open-header{
  //    max-height: 100px;
  //  }
  //}
  //
  //&.delay-open{
  //  .open-header{
  //    animation: openTopNav .4s ease-in-out forwards .4s;
  //  }
  //  @keyframes openTopNav {
  //    from{
  //      max-height: 0;
  //    }
  //    to{
  //      max-height: 100px;
  //    }
  //  }
  //}

}

@media (max-width: 1100px) {
  header {
    grid-template-columns: repeat(2,1fr);

    .top-header{
      nav.top-nav{
        display: none;
      }

      .burger{
        display: block;
        position: relative;
        width: 20px;
        height: 6px;
        justify-self: end;
        cursor: pointer;

      }
    }

    &.sticky .burger{
      .burger-line1,
      .burger-line2,
      .burger-line3{
        background-color: var(--text-color-darker);
      }
    }
  }

}

@media (max-width: 992px) {

}
@media (max-width: 768px){

}
@media (max-width: 576px){

}
</style>
