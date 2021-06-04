<template>
  <div>
    <under-construction></under-construction>
  </div>
</template>

<script>
import UnderConstruction from "@/components/common/UnderConstruction";
import GlideConfig from "@/config/glide";
export default {
  name: "Statics",
  components: {UnderConstruction},
  data(){
    return {
      glides: [GlideConfig.glideFromKey('statics')]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
