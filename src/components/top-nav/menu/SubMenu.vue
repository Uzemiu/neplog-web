<template>
  <li class="menu-item">
    <router-link :to="link">{{title}}</router-link>
    <ul class="sub-menu"><slot></slot></ul>
  </li>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    title: {
      type: String,
      default: 'SubTitle'
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-menu{
  transition: .4s;
  transform: translateY(10px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -10px;
  width: calc(100% + 24px);
  li{
    line-height: 24px;
    text-align: center;
    position: relative;
  }
}
a, span{
  transition: .4s;
}
.menu-item{
  display: block;
  position: relative;
  font-weight: 600;

  a:hover, span:hover{
    color: var(--secondary-blue);
  }

}
.menu-item:hover > .sub-menu{
  opacity: 1;
  transform: translateY(0);
}
</style>
