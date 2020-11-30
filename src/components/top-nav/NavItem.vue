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

  i{
    color: var(--text-color-darker);
    transition: .4s ease-in-out;
  }

  a{
    color: var(--text-color-darker);
    text-decoration: none;
    transition: .4s ease-in-out;

  }

}

</style>
