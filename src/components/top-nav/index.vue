<template>
  <header
    id="header"
    :class="{'sticky':stickyHeader || open, open}"
    ref="header">
    <div class="top-header header-item">
      <div class="logo">Neplog</div>
      <nav-item>
        <li slot="search-bar" class="">
          <search-bar></search-bar>
        </li>
      </nav-item>
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
      <nav-item></nav-item>
    </div>

  </header>
</template>

<script>
import NavItem from "@/components/top-nav/NavItem";
import SearchBar from "@/components/search-bar/index";

export default {
  name: "NavBar",
  components:{
    NavItem,
    SearchBar
  },
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
header{
  width: 100%;
  height: 47px;
  max-height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  z-index: 200;
  transition: background-color .3s ease-in-out;
  font-family: 'Noto Serif SC';

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
      font-family: Play;
    }

    ::v-deep .top-nav{
      a, .fa{
        color: var(--text-color-lightest);
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
    backdrop-filter: blur(2px);
    z-index: 2;
    padding-top: 47px;
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

    ::v-deep .top-nav{
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
          margin-left: 48px;
        }
        li{
          text-align: left;
        }
      }
    }
  }

  &.sticky{
    position: sticky;
    top: 0;
    background-color: rgba(255,255,255,.9);
    box-shadow: 0 0 18px rgba(0,0,0,0.2);

    .burger-line1,
    .burger-line2,
    .burger-line3{
      transition: .4s ease;
    }
    .logo{
      color: var(--text-color-darker)
    }
    .top-header{
      backdrop-filter: blur(2px);
    }
    .top-header ::v-deep .top-nav {
      a, .fa, input{
        color: var(--text-color-darker);
      }
      input::placeholder{
        color: var(--text-color-light-gray);
      }
      .search-bar:hover{
        box-shadow: none;
      }
      .search-bar:hover:after{
        content: "";
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
      ::v-deep .top-nav{
      }
    }
  }
}

@media (max-width: 1100px) {
  header {
    grid-template-columns: repeat(2,1fr);

    .top-header{
      ::v-deep .top-nav{
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