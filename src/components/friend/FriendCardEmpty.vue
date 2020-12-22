<template>
  <el-tooltip class="item" effect="dark" content="成为好友吧~" placement="top">
    <div class="friend-card">
      <div class="plus">
        <div class="plus-vertical plus-item"></div>
        <div class="plus-horizontal plus-item"></div>
      </div>
    </div>
  </el-tooltip>

</template>

<script>
export default {
  name: "FriendCardEmpty"
}
</script>

<style lang="scss" scoped>
.friend-card {
  width: 100%;
  height: 110px;
  border: 1px dashed #6FA2D5;
  border-radius: 10px;
  position: relative;
  transition: .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover{
    border-color: var(--primary-blue);
    box-shadow: 0 0 2px 2px #c6e2ff;
  }
}
.plus{
  width: 60px;
  height: 60px;
  position: relative;
  .plus-item{
    border-radius: 2px;
    background-color:var(--secondary-blue);
    position: absolute;
    &:hover{
      background-color: var(--primary-blue);
    }
  }
  .plus-horizontal{
    width: 1px;
    left: 50%;
    height: 100%;
  }
  .plus-vertical{
    height: 1px;
    top: 50%;
    width: 100%;
  }
}

</style>
