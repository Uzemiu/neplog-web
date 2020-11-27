<template>
  <div class="search-bar">
    <input type="search" placeholder="有什么呢...">
    <i class="fa fa-search"></i>
  </div>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style lang="scss" scoped>
.search-bar{
  cursor: pointer;
  position: relative;
  input{
    border: none;
    background: transparent;
    max-width: 0;
    font-size: 15px;
    transition: .4s ease-in-out;
    font-family: "Noto Serif SC";
  }
  .fa{
    padding: 0 10px;
    color: var(--text-color-darker);
    transition: .4s ease-in-out;
  }

  &:hover{
    input{
      max-width: 200px;
    }
  }
}

.search-bar {
  box-shadow: none;
  input{
    color: var(--text-color-darker);

    &::placeholder{
      color: var(--text-color-light-gray);
    }
  }
  &:after{
    background-color: #c6e2ff;
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  &:hover:after{
    content: "";
  }
}
</style>
