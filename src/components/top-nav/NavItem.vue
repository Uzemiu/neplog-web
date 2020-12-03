<template>
  <nav class="nav-item">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: "NavItem",
}
</script>

<style lang="scss" scoped>
.nav-item{
  justify-self: end;
}

</style>
