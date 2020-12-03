<template>
  <li class="menu-item">
    <a href="#">{{title}}</a>
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
a{
  transition: .4s;
}
.menu-item{
  display: block;
  position: relative;
  font-weight: 600;

  a:hover{
    color: var(--secondary-blue);
  }

}
.menu-item:hover > .sub-menu{
  opacity: 1;
  transform: translateY(0);
}
</style>
