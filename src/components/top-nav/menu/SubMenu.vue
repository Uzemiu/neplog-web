<template>
  <li class="menu-item">
    <router-link :to="link" v-if="link"><slot name="title">{{title}}</slot></router-link>
    <span v-else><slot name="title">{{title}}</slot></span>
    <ul ref="sm" class="sub-menu"><slot></slot></ul>
  </li>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    title: String,
    link: String,
  },
}
</script>

<style lang="scss" scoped>
.sub-menu{
  transition: .4s;
  padding: 10px 0;
  opacity: 1;
  display: none;
  flex-direction: column;
  position: absolute;
  left: -18px;
  width: calc(100% + 36px);
  animation: fade-up .4s;

  li{
    line-height: 24px;
    text-align: center;
    position: relative;
  }
}
a, span{
  cursor: pointer;
  transition: .4s;
}
.menu-item{
  display: block;
  position: relative;
  font-weight: 600;
  span{
    padding: 10px 0;
    color: #666;
  }

  a:hover, span:hover{
    color: var(--secondary-blue);
  }

}
.menu-item:hover > .sub-menu{
  display: flex;
  animation: fade-up .4s;
}

@keyframes fade-up {
  from{
    transform: translateY(10px);
    opacity: 0;
  }

  to{
    transform: translateY(0);
    opacity: 0.9;
  }
}
</style>
