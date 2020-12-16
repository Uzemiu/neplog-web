<template>
  <header
    id="header"
    :class="{'transparent':transparentHeader && !open && !forceStickyHeader, open}"
    ref="header">
    <div class="top-header header-item">
      <div class="logo">Neplog</div>
      <component :is="pluto">
        <li slot="search-bar">
          <search-bar></search-bar>
        </li>
      </component>
      <div class="burger" @click="openTopBar">
        <div class="burger-line1"></div>
        <div class="burger-line2"></div>
        <div class="burger-line3"></div>
      </div>
    </div>

    <div class="side-nav" ref="openHeader">
      <div class="avatar">
        <img src="../../assets/imgs/tomorinao.jpg" alt="">
      </div>
      <search-bar class="side-search-bar"></search-bar>
      <component :is="pluto"></component>
    </div>

  </header>
</template>

<script>
import SearchBar from "@/components/search-bar/index";
import MainNav from "@/components/top-nav/MainNav";
import BackstageNav from "@/components/top-nav/BackstageNav";

export default {
  name: "NavBar",
  components:{
    SearchBar,
  },
  data(){
    return {
      transparentHeader: true,
      open: false,
      path: this.$route
    }
  },
  methods: {
    changeTransparentHeader(){
      let height = this.$refs.header.getBoundingClientRect().height;
      this.transparentHeader = window.pageYOffset - height < 40;
    },
    openTopBar(){
      this.open = !this.open;
    }
  },
  mounted() {
    window.addEventListener('scroll',this.changeTransparentHeader)
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.changeTransparentHeader)
  },
  computed: {
    pluto(){
      return this.$route.fullPath.startsWith('/pluto')
        ? BackstageNav : MainNav;
    },
    forceStickyHeader(){
      const route = this.$route.fullPath;
      return route.startsWith('/pluto') || route.startsWith('/user') || route.startsWith('/install');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/font-awesome/css/font-awesome.min.css";
header{
  width: 100%;
  height: 47px;
  max-height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: fixed;
  z-index: 200;
  transition: background-color .3s ease-in-out;
  font-family: 'Noto Serif SC';
  top: 0;
  background-color: rgba(255,255,255,.9);
  box-shadow: 0 0 18px rgba(0,0,0,0.2);

  .header-item{
    padding: 0 40px;
  }
  .top-header{
    display: grid;
    grid-template-columns: 100px 2fr;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 234;
    font-weight: 600;
    backdrop-filter: blur(2px);

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
        background-color: var(--text-color-darker);
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
      color: var(--text-color-darker);
      font-family: Play;
    }
    ::v-deep .nav-item {
      .menu-item{
        margin: 0 12px;
      }
      a{
        &:after{
          background-color: var(--secondary-blue);
          bottom: -12px;
          content: "";
          position: absolute;
          left:0;
          width: 0;
          height: 4px;
          transition: .4s;
        }
      }
      .router-link-exact-active{
        color: var(--secondary-blue);
        &:after{
          width: 100%;
        }
      }
      .fa, input{
        color: #666;
      }
      input::placeholder{
        color: var(--text-color-light-gray);
      }
      .search-bar:hover:after{
        content: "";
      }
      .sub-menu{
        margin-top: 8px;
        padding: 10px 0;
        background-color: rgba(255,255,255,9);
        box-shadow: 2px 2px 18px rgba(0,0,0,0.2);
        border-radius: 5px;

        &:before{
          content: "";
          position: absolute;
          top: -14px;
          left: 34px;
          border-width: 7px;
          border-style: solid;
          border-color: transparent transparent #fff;
        }
        .router-link-exact-active:after{
          width: 0;
        }
      }
    }

  }

  &.transparent{
    background-color: transparent;
    box-shadow: none;
    .top-header{
      backdrop-filter: none;
      .logo{
        color: var(--text-color-lightest);
      }
      .burger-line1,
      .burger-line2,
      .burger-line3{
        background-color: var(--text-color-lightest);
      }
      ::v-deep .nav-item{
        a, .fa{
          color: var(--text-color-lightest);
        }
        a:hover, .link-active.router-link-exact-active{
          color: var(--secondary-blue);
        }
        .sub-menu{
          margin-top: 0;
          padding: 0;
          background-color: transparent;
          box-shadow: none;
          &:before{
            content: none;
          }
        }
        input{
          &, &::placeholder{
            color: var(--text-color-lightest);
          }
        }
        .search-bar:hover{
          background-color: rgba(255,255,255,.2);
          box-shadow: 0 2px 10px 1px rgba(0,0,0,.15);
        }
        .search-bar:hover:after{
          content: unset;
        }
      }
    }

  }
  .side-nav{
    position: fixed;
    height: 100vh;
    width: 200px;
    transform: translateX(200px);
    top: 0;
    right: 0;
    background-color: rgba(255,255,255,.9);
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    transition: .4s ease-in-out;
    z-index: 20;
    padding-top: 53px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar{
      display: flex;
      justify-content: center;
      img{
        width: 100px;
        height: 100px;
      }
    }

    .side-search-bar{
      width: 160px;
      margin-top: 15px;
      ::v-deep input{
        max-width: 130px;
      }
      ::v-deep .fa{
        padding-right: 0;
      }
      &:after{
        content: "";
      }
    }

    ::v-deep .nav-item{
      ul{
        flex-direction: column;
      }
      li{
        padding: 4px 0;
      }
      .sub-menu{
        position: relative;
        opacity: 1;
        transform: translateY(0);
        overflow: hidden;
        a{
          color: var(--text-color-gray);
          padding-left: 48px;
          &:hover{
            color: var(--secondary-blue);
          }
        }
        .router-link-exact-active{
          color: var(--secondary-blue);
        }
        li{
          text-align: left;
        }
      }
    }
  }


  &.open{
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
    .side-nav{
      max-width: 200px;
      transform: translateY(0);
      ::v-deep .nav-item{
      }
    }
  }
}

@media (max-width: 992px) {
  header {
    grid-template-columns: repeat(2,1fr);

    .top-header{
      ::v-deep .nav-item{
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
