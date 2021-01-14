<template>
  <el-popover
    ref="popover"
    trigger="manual"
    v-model="openMenu">
    <slot></slot>
  </el-popover>
</template>

<script>
export default {
  name: "ContextMenu",
  data(){
    return {
      openMenu: false
    }
  },
  methods: {
    open(event){
      event.preventDefault();
      this.openMenu = true;
      this.$nextTick(() => {
        const popper = this.$refs.popover.popperElm;
        const popperWidth = popper.offsetWidth;
        const popperHeight = popper.offsetHeight;
        const top = Math.min(document.body.clientHeight - popperHeight, event.clientY);
        const left = Math.min(document.body.clientWidth - popperWidth, event.clientX);
        popper.style.top = top + 'px';
        popper.style.left = left + 'px';
        document.body.append(popper);
        document.body.addEventListener('click', this.close);
      })
    },
    close(){
      this.openMenu = false;
      document.body.removeEventListener('click',this.close);
    },
  }
}
</script>

<style scoped>

</style>
