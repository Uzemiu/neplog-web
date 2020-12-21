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

  .filter-btns {
    padding: 10px;
    margin-bottom: 12px;
    width: 100%;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
    transition: 0.4s ease-in-out;
    max-width: 90vw;

    .collapse-button {
      height: 10px;
      text-align: center;
      transition: .4s ease-in-out;
      padding: 0 5px;

      .collapse-btn {
        width: 100%;
        border: 0;
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer;

        .fa {
          font-size: 20px;
          transform: translateY(-4px);
          transition: .4s ease-in-out;
        }

        span {
          vertical-align: top;
        }
      }
    }

    &.collapse {
      overflow: hidden;

      .flex-wrapper:nth-of-type(n+2) {
        max-height: 0;
        padding: 0;
      }

      .collapse-button .fa {
        transform: rotate(180deg) translateY(2px);
      }
    }

    button {
      &:focus, &:active {
        outline: none;
      }
    }

    .flex-wrapper:first-of-type {
      padding-top: 0;

      &:before {
        content: none;
      }
    }

    .filter-btn {
      flex-shrink: 0;
      margin: 3.5px 6px 3.5px 6px;
      background-color: var(--secondary-color);
      border: 0;
      color: var(--text-color-dark-gray);
      padding: 6px 14px;
      border-radius: 4px;
      transition: .4s ease-in-out;
      cursor: pointer;

      &.active {
        background-color: var(--primary-color);
        color: white;
      }
    }

    .search-group {
      display: flex;

      .general-filter {
        max-width: calc(96vw - 90px);
      }

      .search-btn {
        margin-left: auto;
        background-color: #0097e6;
        color: #fff;
        height: 29px;
      }
    }
  }

</style>
