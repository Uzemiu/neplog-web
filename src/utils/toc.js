class TocNode{
  constructor(level, heading, children = []){
    this.level = level;
    this.heading = heading;
    this.children = children;
    this.el = null;
  }
  toTocElement(){
    const root = create(this.level === 0 ? 'nav' : 'li');
    if(this.heading){
      root.innerHTML = `<a href="#${this.heading.id}">${this.heading.innerText}</a>`;
    }
    if(this.children.length > 0){
      const ol = create('ol');
      root.appendChild(ol);
      this.children.forEach(c => {
        ol.appendChild(c.toTocElement());
      })
    }

    this.el = root;
    return root;
  }
}

function create(element){
  return document.createElement(element);
}

const toc = {
  root: new TocNode(0),
  nodes: [],
  el: null,
  option: {
    tocClass:'table-of-contents',
    enableScrollToc: true,
    enableSmoothScroll: true
  }
}

function findFather(current){
  let nodes = toc.nodes;
  for(let i = current-1;i>=0;i--){
    if(nodes[i].level < nodes[current].level){
      return nodes[i];
    }
  }
  return toc.root;
}

function scrollToc(){
  let nodes = toc.nodes;
  nodes.forEach(e => e.el.classList.remove('toc-active', 'toc-active-only'));
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].heading.getBoundingClientRect().top < 47) {
      nodes[i].el.classList.add('toc-active-only');
      for (let parent = nodes[i].el;
           parent && parent !== toc.el;
           parent = parent.parentNode) {
        if (parent.tagName === 'LI') {
          parent.classList.add('toc-active');
        }
      }
      break;
    }
  }
}

function enableScrollToc(){
  window.addEventListener('scroll', scrollToc);
}

function disableScrollToc(){
  window.removeEventListener('scroll', scrollToc);
}

function generateToc(selector = 'body', option = {}){
  const headings = document.querySelector(selector)
                        .querySelectorAll('h1, h2, h3, h4, h5, h6');
  // first push all heading nodes
  headings.forEach(h => toc.nodes.push(new TocNode(Number.parseInt(h.tagName.charAt(1)), h)));

  // find father
  toc.nodes.forEach((e,i) => findFather(i).children.push(e));

  const rootEl = toc.root.toTocElement();
  toc.el = rootEl;

  rootEl.classList.add('table-of-contents');
  enableScrollToc();

  return rootEl;
}

export default {
  generateToc,
  enableScrollToc,
  disableScrollToc
}
