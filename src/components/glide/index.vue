<template>
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides" ref="glide">
        <glide-slide
          v-for="(glide, i) in glides"
          :key="i"
          :link="glide.link"
          :title="glide.title"
          :img="glide.img">
        </glide-slide>
      </div>
    </div>

    <div class="glide__arrows" data-glide-el="controls" v-if="isMultiSlide">
      <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
        &lt;
      </button>
      <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
        &gt;
      </button>
    </div>

    <div class="glide__bullets" data-glide-el="controls[nav]" v-if="isMultiSlide">
      <button
        class="glide__bullet"
        v-for="i in glides.length || 0"
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
    glides: {
      type: Array,
      default: () => {
        return [{img: require("@/assets/imgs/glide/322529.jpg")}]
      }
    },
    arrows: {
      type: Boolean,
      default: undefined
    },
    bullets: {
      type: Boolean,
      default: undefined
    }
  },
  methods: {
    initSlide() {
      let glide = new Glide('.glide').mount();
      let glides = this.$refs.glide.querySelectorAll('.slide-caption');
      glide.on(['mount.after', 'run.after'], () => {
        this.$anime({
          targets: glides[glide.index].children,
          opacity: [0, 1],
          duration: 400,
          easing: 'linear',
        })
      });
      let glidesChildren = this.$refs.glide.querySelectorAll('.slide-caption > *');
      glide.on(['run.before'], () => {
        glidesChildren.forEach(e => e.style.opacity = 0)
      })
    }
  },
  computed: {
    isMultiSlide() {
      return this.glides.length > 1;
    }
  },
  watch: {
    /**
     * 如果需要启用glide滑动或需要动画时
     *   如果glides动态传入, 需要通过watch监听glides变化来初始化glide
     *   如果glides静态传入, 需手动调用initSlide
     */
    glides(){
      this.$nextTick(() => {
        this.initSlide();
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@glidejs/glide/dist/css/glide.core.min.css";
@import "~@glidejs/glide/dist/css/glide.theme.min.css";

.glide {
  position: relative;
  z-index: 50;
  cursor: pointer;
  margin-bottom: 47px;

  .glide__slides .glide__slide:first-child .backdrop {
    opacity: .8;
  }

  .glide__slides, .glide__slide {
  }

}

</style>
