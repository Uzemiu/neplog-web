<template>
  <li class="menu-item">
    <router-link :to="link" v-if="link"><slot name="title">{{title}}</slot></router-link>
    <span v-else><slot name="title">{{title}}</slot></span>
    <ul class="sub-menu"><slot></slot></ul>
  </li>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    title: String,
    link: String,
  }
}
</script>

<style lang="scss" scoped>
.sub-menu{
  transition: .4s;
  transform: translateY(10px);
  padding: 10px 0;
  opacity: 0;
  display: flex;
  visibility: hidden;
  flex-direction: column;
  position: absolute;
  left: -18px;
  width: calc(100% + 36px);

  li{
    line-height: 24px;
    text-align: center;
    position: relative;
  }
}
a, span{
  cursor: pointer;
  transition: .4s;
}
.menu-item{
  display: block;
  position: relative;
  font-weight: 600;
  span{
    color: #666;
  }

  a:hover, span:hover{
    color: var(--secondary-blue);
  }

}
.menu-item:hover > .sub-menu{
  visibility: visible;
  opacity: 0.9;
  transform: translateY(0);
}
</style>
