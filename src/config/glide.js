import store from "@/store";

const GlideConfig = {
  glide_image_home: require('@/assets/imgs/glide/321193.jpg'),
  glide_title_home: 'Hello Neplog!',
  glide_image_friend: require('@/assets/imgs/glide/322529.jpg'),
  glide_title_friend: 'Hello Nep\' friends!',
  glide_image_tag: require('@/assets/imgs/glide/320886.jpg'),
  glide_title_tag: '标签',
  glide_image_category: require('@/assets/imgs/glide/320886.jpg'),
  glide_title_category: '分类',
  glide_image_archive: require('@/assets/imgs/glide/320655.jpg'),
  glide_title_archive: '归档',
  glide_image_about: require('@/assets/imgs/glide/322611.jpg'),
  glide_title_about: '关于',
  glide_image_statics: require('@/assets/imgs/glide/320786.jpg'),
  glide_title_statics: '统计信息',

  glideFromKey
}

export function glideFromKey(key){
  return {
    img: store.getters.blogConfig[`glide_image_${key}`] || GlideConfig[`glide_image_${key}`],
    title: store.getters.blogConfig[`glide_title_${key}`] || GlideConfig[`glide_title_${key}`],
  }
}


export default GlideConfig
