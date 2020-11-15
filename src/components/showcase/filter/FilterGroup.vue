<template>
  <div class="flex-wrapper">
    <button
        class="filter-btn"
        :class="{'active':activeTags.size === 0}"
        @click="activeButton('all')">{{filterTag}}
    </button>
    <button
        class="filter-btn"
        v-for="tag in tags"
        :key="tag"
        @click="activeButton(tag)"
        :class="{'active':isButtonActive(tag)}">
      {{tag}}
    </button>
    <slot name="search"></slot>
  </div>
</template>

<script>
  export default {
    name: "FilterGroup",
    props: {
      filterTag: {
        default: 'All'
      },
      tags: Array,
      defaultTag: null,
      multiChoice: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        activeTracker: 1,
        activeTags: new Set(),
      }
    },
    methods: {
      activeButton(tag){
        this.activeTracker+=1;
        if(this.multiChoice){
          if(tag.toLowerCase() === 'all'){
            this.activeTags.clear();
          } else if(this.activeTags.has(tag)){
            this.activeTags.delete(tag);
          } else {
            this.activeTags.add(tag);
          }
        } else {
          this.activeTags.clear();
          if(tag !== 'all') this.activeTags.add(tag);
        }

      },
      isButtonActive(tag){
        return this.activeTracker && this.activeTags.has(tag);
      }
    },
    mounted() {
      if(this.defaultTag) {
        this.activeButton(this.defaultTag)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .flex-wrapper{
    padding-top: 6px;
    max-width: unset;
    display: flex;
    flex-wrap: nowrap;
    transition: .4s ease-in-out;
    max-height: 57px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;


    &::-webkit-scrollbar{
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.1);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    }

    &:before{
      content: "";
      display: block;
      position: absolute;
      top: 3px;
      height: 1px;
      width: 100%;
      background-color: var(--text-color-lightest);
    }
  }
</style>
