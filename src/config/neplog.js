const NeplogConfig = {
  // 博客相关
  authorName: '', // 默认为用户昵称
  blogAvatar: '', // 默认为用户头像
  icp: '', // 备案号

  // 图片相关
  defaultAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  imgNotFound: require('@/assets/imgs/sticker/nep404.png'),

  // AES密钥，确保与后端配置一致
  AESKey: 'I8KI6i+3UhXVd02N',

  // 上传文件相关
  maxImageSize: 1024*1024*3, // 3MB
  maxFileSize: 1024*1024*30, // 30MB

  // 样式相关
  navBarHeight: 47
}

export default NeplogConfig;

