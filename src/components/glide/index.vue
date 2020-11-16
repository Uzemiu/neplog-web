<template>
  <div class="glide">

    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides" ref="glide">
        <glide-slide
          v-for="article in slides"
          :link="`/article/${article.id}`"
          :title="article.title"
          :key="article.id">
          <img slot="img" :src="article.img" alt="">
        </glide-slide>
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
        v-for="i in slides.length"
        :key="i"
        :data-glide-dir="`=${i-1}`"></button>
    </div>

  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import GlideSlide from "@/components/glide/GlideSlide";

export default {
  name: "Glide",
  components: {
    GlideSlide
  },
  props: {
    slides: Array
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
      return !this.slides || this.slides.length > 1;
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
