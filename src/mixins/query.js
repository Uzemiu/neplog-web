export default {
  methods: {
    handleSizeChange(val){
      if(this.query){
        this.query.size = val;
        this.tryRefresh();
      }
    },
    handleCurrentChange(val){
      if(this.query){
        this.query.page = val - 1;
        this.tryRefresh();
      }
    },
    changeSection(tab){
      if(this.query && tab.$attrs.query){
        Object.assign(this.query, tab.$attrs.query);
        this.tryRefresh();
      }
    },
    tryRefresh(){
      if(typeof(this.refresh) === 'function'){
        this.refresh();
      }
    }
  },
}
