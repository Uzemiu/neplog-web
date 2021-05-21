<template>
  <div class="showcase">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Responsive"
}
</script>

<style lang="scss" scoped>
.showcase{
  width: 931px;
}

@media (max-width: 992px) {
  .showcase {
    width: 94%;
  }
}

@media (max-width: 768px) {

}

@media (max-width: 576px) {
  .showcase{
    width: 100%;
  }
}

</style>
