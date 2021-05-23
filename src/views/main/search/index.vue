<template>
  <div class="search-page">
    <responsive class="search-item">
      <input class="search-input" type="text"/>
      <el-button class="search-button" type="text"><i class="fa fa-search"></i></el-button>
    </responsive>
  </div>
</template>

<script>
import Responsive from "@/components/layout/Responsive";
export default {
  name: "SearchPage",
  components: {Responsive},
  data(){
    return {
      glides: [{img:require('@/assets/imgs/glide/wp1902570.jpg'), title:'SEARCH'}]
    }
  },
  activated() {
    this.$store.commit('setTransparentHeader', false);

  },
  deactivated() {
    this.$store.commit('setTransparentHeader', true)
  }
}
</script>

<style lang="scss" scoped>
.search-page{
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-item{
    display: flex;
    padding: 0 30px;
    margin-top: 50px;
    height: 50px;
    border-radius: 25px;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,0.07);
  }

  .search-input{
    display: inline-block;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 0 5px;
    font-size: 16px;
  }
  .search-button{
    margin-left: 25px;
    padding: 0;
  }
}
</style>
