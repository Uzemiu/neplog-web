import mavonEditor from 'mavon-editor'
import hljs from 'highlight.js'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

let md = mavonEditor.markdownIt;

md.inline.ruler.disable('toc');
md.core.ruler.disable('grab_state');
delete md.renderer.rules['heading_open'];

md.use(anchor)
  .use(markdownItTocDoneRight);

md.options.highlight = function (str, lang) {
  const hljslang = hljs.getLanguage(lang);

  if (lang.endsWith('=') || (lang && hljslang)) {
    // 显示行号
    const preCode = hljslang
      ? hljs.highlight(lang, str, true).value
      : md.utils.escapeHtml(str);

    const lines = preCode.split(/\n/).length - 1;
    let lineNumbers = '<span class="line-numbers">';
    for (let i = 0; i < lines; ++i) {
      lineNumbers += '<span class="line-number"></span>';
    }
    lineNumbers += '</span>';
    // return preCode + lineNumbers;
    return `<pre class="hljs"><code class="lang-${lang}">${preCode + lineNumbers}</code></pre>`;
  }
  const preCode = md.utils.escapeHtml(str);
  return `<pre class="hljs no-line-number"><code>${preCode}</code></pre>`;
}

export default mavonEditor;
