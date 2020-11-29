const article = `<nav class="table-of-contents"><ol><li><a href="#header1">Header1</a><ol><li><a href="#testpoint2-1">TestPoint2122222222222222会不会溢出呢</a></li><li><a href="#testpoint2-2">TestPoint2-2</a></li><li><a href="#testpoint2-3">TestPoint2-3</a></li></ol></li><li><a href="#header2">Header2</a></li><li><a href="#header3">Header3</a><ol><li><a href="#%E4%BD%A0%E5%A5%BD">你好</a></li></ol></li></ol></nav><h1 id="header1">Header1</h1>
<pre><div class="hljs"><code class="lang-java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] args)</span></span>{
















}
</code></div></pre>
<h2 id="testpoint2-1">TestPoint2-12222222222会不会益处呢</h2>
<p>nihaonaih</p>
<pre><div class="hljs"><code class="lang-js"><span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>;

























</code></div></pre>
<h2 id="testpoint2-2">TestPoint2-2</h2>
<h2 id="testpoint2-3">TestPoint2-3</h2>
<h1 id="header2">Header2</h1>
<br>
<br>
<br>
<br>
<br>
<br>
<h1 id="header3">Header3</h1>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<h2 id="%E4%BD%A0%E5%A5%BD">你好</h2>`

let articleList = [{
  id: 1,
  tags: ['Home', 'Java', 'Html', 'TESTTAGSTESTTAGSTEST'],
  category: '首页',
  cover: require('../assets/imgs/71767472_p0.jpg'),
  title: '首页施工中...',
  createDate: '2020-11-15',
  summary: '94.666666666666666666666666666666ddddddddddddddd%...',
  view: 0
}, {
  id: 2,
  tags: ['Article', 'Java'],
  category: '文章',
  cover: require('../assets/imgs/75977007_p0.jpg'),
  title: '文章页面施工中...'
}, {
  id: 3,
  tags: ['links'],
  category: '友情链接',
  cover: require('../assets/imgs/71773962_p0.jpg'),
  title: '友情链接施工中...'
}, {
  id: 4,
  tags: ['about'],
  cover: require('../assets/imgs/QQ图片20201110135305.jpg'),
  category: '关于我',
  title: '个人页面施工中...'
}]


export {article, articleList};
