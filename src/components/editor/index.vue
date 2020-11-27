<template>
  <div>
    <glide class="editor-glide"></glide>
    <mavon-editor
      ref=md
      v-model="html"
      @save="handleSave"></mavon-editor>

  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/vs2015.css'
import '@/assets/css/markdown.scss'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import Glide from "@/components/glide/index";

export default {
  name: "index",
  components: {
    Glide
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
    let md = this.$refs.md.markdownIt;
    console.log(md)

    md.options.highlight = function (str, lang) {
      if (lang && window.hljs.getLanguage(lang)) {
        const preCode = window.hljs.highlight(lang, str, true).value
        const lines = preCode.split(/\n/).length - 1;
        let lineNumbers = '<span class="line-numbers">';
        for(let i=0;i<lines;++i){
          lineNumbers += '<span class="line-number"></span>'
        }
        lineNumbers += '</span>';
        return preCode+lineNumbers;
      }
      const preCode = md.utils.escapeHtml(str)
      return '<pre class="hljs"><code>' + preCode +
        '</code></pre>'
    }

    md.disable('toc')
  }
}
</script>

<style lang="scss" scoped>
.editor-glide{
  ::v-deep .glide-img{
    height: 47px;
  }
}
</style>
