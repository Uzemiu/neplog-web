<template>
  <not-found style="padding-top: 50px"></not-found>
</template>

<script>
import NotFound from "@/components/common/NotFound";

export default {
  name: "Page404",
  components: {
    NotFound
  },
  activated(){
    this.$store.commit('setTransparentHeader', false);
  },
  deactivated() {
    this.$store.commit('setTransparentHeader', true);
  }
}
</script>

<style lang="scss" scoped>

</style>
