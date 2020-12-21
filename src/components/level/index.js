import level from './require-level'

const install = function(Vue){
  Vue.directive('level', level)
}

if(window.Vue){
  window['level'] = level
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

level.install = install;
export default level;
