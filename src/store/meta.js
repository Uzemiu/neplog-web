export default {
  state: {
    title: '',
    keywords: 'Neplog',
    description: 'This is Neplog'
  },
  mutations: {
    setMeta(state, meta){
      Object.assign(state, meta);
    },
  },
}
