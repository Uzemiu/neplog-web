<template>
  <ul class="menu"><slot></slot></ul>
</template>

<script>
export default {
name: "Menu"
}
</script>

<style scoped>
.menu{
  display: flex;
}
</style>
