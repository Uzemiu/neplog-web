<template>
  <div class="glide">

    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides" ref="glide">
        <slot></slot>
<!--        <glide-slide-->
<!--          v-for="article in slides"-->
<!--          :key="article.id"-->
<!--          :link="`/article/${article.id}`"-->
<!--          :title="article.title"-->
<!--          :img="article.img"-->
<!--          :info="'12323123'">-->

<!--        </glide-slide>-->
      </div>
    </div>

    <div class="glide__arrows" data-glide-el="controls" v-show="isSingleSlide">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
        &lt;
      </button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
        &gt;
      </button>
    </div>

    <div class="glide__bullets" data-glide-el="controls[nav]" v-show="isSingleSlide">
      <button
        class="glide__bullet"
        v-for="i in glideLength || 0"
        :key="i"
        :data-glide-dir="`=${i-1}`"></button>
    </div>

  </div>
</template>

<script>
import Glide from '@glidejs/glide'

export default {
  name: "Glide",
  components: {
  },
  props: {
    glideLength: Number
  },
  mounted() {
    this.initSlide();
  },
  methods: {
    initSlide(){
      this.$nextTick(() => {
        let glide = new Glide('.glide').mount();
        let glides = this.$refs.glide.querySelectorAll('.slide-caption');
        glide.on(['mount.after','run.after'], () => {
          this.$anime({
            targets: glides[glide.index].children,
            opacity: [0,1],
            duration: 400,
            easing: 'linear',
          })
        });
        let glidesChildren = this.$refs.glide.querySelectorAll('.slide-caption > *');
        glide.on(['run.before'], () => {
          glidesChildren.forEach(e => e.style.opacity = 0)
        })
      })
    }
  },
  computed: {
    isSingleSlide(){
      return !this.glideLength;
    }
  }
}
</script>

<style lang="scss">
@import "~@glidejs/glide/dist/css/glide.core.min.css";
@import "~@glidejs/glide/dist/css/glide.theme.min.css";

.glide {
  position: relative;
  top: -47px;
  z-index: 50;
  cursor: pointer;

  .glide__slides .glide__slide:first-child .backdrop{
    opacity: .8;
  }

}

</style>
