<template>
  <div class="features">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Features"
}
</script>

<style lang="scss" scoped>
.features{
//display: flex;
//justify-content: space-around;
//flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 126px 126px;
  column-gap: 5vw;
}

@media (max-width: 992px) {
  .features{
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: unset;
  }
}
@media (max-width: 768px){
}
@media (max-width: 576px){
  .features{
    grid-template-columns: 1fr;
  }
}
</style>
