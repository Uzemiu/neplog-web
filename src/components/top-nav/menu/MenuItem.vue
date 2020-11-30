<template>
  <li class="menu-item"><slot></slot></li>
</template>

<script>
export default {
name: "MenuItem"
}
</script>

<style lang="scss" scoped>
.menu-item{
  display: block;
  position: relative;

  a:hover, .link-active.router-link-exact-active{
    color: var(--secondary-blue);
  }
}
.menu-item:hover > .sub-menu{
  opacity: 1;
  transform: translateY(0);
}


</style>
