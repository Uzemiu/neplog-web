export default {
  title: [
    {required: true, message: '请输入文章标题', trigger:'blur'},
    {max: 255, message: '标题长度在255个字符以内', trigger: 'blur'}
  ],
  category: {required: true, message: '必须选择一个分类', trigger:'blur'}
}
