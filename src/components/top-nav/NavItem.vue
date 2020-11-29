<template>
  <nav class="top-nav">
    <ul class="menu">
      <li class="menu-item"><router-link to="/">首页</router-link></li>
      <li class="menu-item"><router-link to="/friends">朋友们</router-link></li>
      <li class="menu-item"><router-link to="/article">关于</router-link></li>
      <li class="menu-item">
        <a href="#">有什么呢</a>
        <ul class="sub-menu">
          <li><router-link to="/statics">统计信息</router-link></li>
          <li><router-link to="/another">其他1</router-link></li>
          <li><router-link to="/another">打卡</router-link></li>
        </ul>
      </li>
      <slot name="search-bar"></slot>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavItem",
}
</script>

<style lang="scss" scoped>

.top-nav{
  justify-self: end;

  .menu{
    display: flex;

    .menu-item{
      display: block;
      position: relative;
    }
    .menu-item:hover > .sub-menu{
      opacity: 1;
      transform: translateY(0);
    }
    .sub-menu{
      transition: .4s;
      transform: translateY(10px);
      opacity: 0;
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      a{
        margin: 0;
      }
      li{
        text-align: center;
      }
    }
  }

  i{
    color: var(--text-color-darker);
    transition: .4s ease-in-out;
  }

  a{
    color: var(--text-color-darker);
    text-decoration: none;
    margin: 0 24px;
    transition: .4s ease-in-out;
  }

}
</style>
