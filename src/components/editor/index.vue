<template>
  <div>
    <mavon-editor
      ref=md
      v-model="html"
      @save="handleSave"></mavon-editor>

  </div>


</template>

<script>
import 'mavon-editor/dist/css/index.css';
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

export default {

  name: "index",
  components: {
  },
  data() {
    return {
      markdownIt: null,
      html: ''
    }
  },
  methods: {
    handleSave(value,render){
      console.log(value);
      console.log(render);
    }
  },
  mounted() {
    this.$refs.md.markdownIt
      .use(anchor)
      .use(markdownItTocDoneRight);
  }
}
</script>

<style scoped>
.n-editor{

}
</style>
