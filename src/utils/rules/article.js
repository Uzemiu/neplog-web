export default {
  title: [
    {required: true, message: '请输入文章标题', trigger:'blur'},
    {min: 1, max: 255, message: '标题长度在255个字符以内', trigger: 'blur'}
  ],
}
