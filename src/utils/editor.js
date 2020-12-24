import mavonEditor from '@neptu/mavon-editor'
import hljs from 'highlight.js'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

let md = mavonEditor.markdownIt;

md.use(anchor)
  .use(markdownItTocDoneRight);

md.disable('toc')

md.options.highlight = function (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    const preCode = hljs.highlight(lang, str, true).value
    const lines = preCode.split(/\n/).length - 1;
    let lineNumbers = '<span class="line-numbers">';
    for (let i = 0; i < lines; ++i) {
      lineNumbers += '<span class="line-number"></span>'
    }
    lineNumbers += '</span>';
    return preCode + lineNumbers;
  }
  const preCode = md.utils.escapeHtml(str)
  return '<pre class="hljs"><code>' + preCode +
    '</code></pre>'
}

export default mavonEditor;