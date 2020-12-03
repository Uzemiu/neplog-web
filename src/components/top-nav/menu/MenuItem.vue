<template>
  <li class="menu-item"><router-link :to="link"><slot></slot></router-link></li>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item{
  display: block;
  position: relative;

  a:hover, .link-active.router-link-exact-active{
    color: var(--secondary-blue);
  }
  a, a:after{
    font-weight: 600;
    transition: .4s;
  }
}

</style>
