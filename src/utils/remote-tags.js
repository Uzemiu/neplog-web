const RemoteCss = {
  render(createElement) {
    return createElement('link', { attrs: { rel: 'stylesheet', href: this.href }});
  },
  props: {
    href: { type: String, required: true },
  }
};
const RemoteTags = {
  render(createElement) {
    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
  },
  props: {
    src: { type: String, required: true },
  },
};

export {RemoteCss, RemoteTags};
