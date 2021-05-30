<template>
  <div class="toc" ref="toc"></div>
</template>

<script>
import Toc from "@/components/toc/toc";

export default {
  name: "Toc",
  methods:{
    mount(root, option){
      this.$refs.toc.appendChild(Toc.generateToc(root, option));
    }
  },
  destroyed() {
    let toc = this.$refs.toc;
    for(let child of toc.children){
      toc.removeChild(child);
    }
    Toc.disableScrollToc();
  }
}
</script>

<style lang="scss" scoped>
.table-of-contents {
  margin: 20px 0;
  width: 150px;
  height: auto;
  position: sticky;
  top: 67px;
  z-index: 1;
  overflow: hidden;
  font-size: 15px;
  line-height: 20px;

  ol {
    word-wrap: anywhere;
    padding-left: 17px;
  }

  li > ol {
    display: none;
  }

  a {
    height: 100%;
    color: #000;
  }

  a:before {
    content: "";
    position: absolute;
    display: block;
    left: 6px;
    height: inherit;
    width: 2px;
    background-color: #eeeeee;
  }

  .toc-active > a{
    color: #0097e6;
  }

  .toc-active > ol {
    display: block;
  }

  .toc-active-only a:before {
    background-color: #0097e6;
  }
}
</style>
