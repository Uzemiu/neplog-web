<template>
  <div class="glide__slide">
    <div class="slide-caption">
      <a :href="link" class="title">{{title}}</a>
      <h3 v-if="subTitle">{{subTitle}}</h3>
    </div>
    <div class="backdrop"></div>
    <img v-lazy="img" alt="" class="glide-img">
  </div>
</template>

<script>
export default {
  name: "GlideSlide",
  props: {
    link: {
      type: [String, Number],
      default: '#'
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    img: {
      type: null,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.glide__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  .backdrop{
    background-color: var(--backdrop-color);
    z-index: 60;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;

  }
  img{
    width: 100vw;
    height: 40vh;
    /* 自动等比例缩放 */
    object-fit: cover;
  }
  .slide-caption{
    width: 80%;
    position: absolute;
    z-index: 70;
    color: var(--text-color-lightest);
    text-align: center;
    max-width: 70vw;

    h1{
      font-size:48px;
      font-weight: 600;
    }
    .title{
      font-size: 48px;
      font-weight: 600;
      color: #fff;
      display: block;
    }
    h3{
      font-size:24px;
      margin: 48px 0;
    }
  }
  .detail{
    margin-top: 16px;
    padding: 4px 8px;
    background-color: rgba(0,0,0,0);
    border: 1px rgba(255,255,255,1) solid;
    border-radius: 4px;
    color: var(--text-color-lightest);
    font-size: 16px;
    cursor: pointer;
    outline: none;
    transition: .4s;

    &:hover{
      background-color: rgba(255,255,255,1);
      color: rgb(56,161,249);
    }
  }
}

@media (max-width: 992px) {
  .glide__slide {
    .slide-caption{
      .title{

      }
      h3{
      }
    }
    .detail{
      margin-top: 12px;
    }
  }
}
@media (max-width: 768px){
  .glide__slide {
    .slide-caption{
      .title{
        font-size: 40px;
      }
      h3{
      }
    }
    .detail{
      margin-top: 8px;
    }
  }
}
@media (max-width: 576px){
  .glide__slide {
    .slide-caption{
      .title{
        font-size: 26px;
      }
      h3{
      }
    }
    .detail{
      padding: 3px 6px;
      font-size: 13px;
      margin-top: 3px;
    }
  }
}
</style>
