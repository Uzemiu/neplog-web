<template>
  <div class="chips">
    <div
      class="chip-item"
      v-for="(item,index) in data"
      :style="computeCustomStyle(item,index)"
      :key="item[chipKey] || item[label]">

      <span class="chip-label" @click="$emit('chipClick', item)">
        <slot :item="item">
          {{item[label]}}
        </slot>
        <span
          v-if="showDeleteIcon"
          class="delete-icon"
          @click="$event.stopPropagation(); $emit('deleteClick',item)">
          <i class="fa fa-times-circle-o"></i>
        </span>
      </span>

    </div>
  </div>
</template>

<script>
import {hashString} from "@/utils/hashcode";
import {ColorSet, getTextColor} from "@/utils/color";

export default {
  name: "Chips",
  props: {
    data: {
      type: Array,
      default: function (){
        return []
      }
    },
    chipKey: {
      type: String,
      default: 'id'
    },
    label: {
      type: String,
      default: 'label'
    },
    showDeleteIcon: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: [Object, Function],
      default: function(){
        let set = ColorSet["set-chips"];

        return function(data,index){
          let hash = Math.abs(hashString(data[this.label]))
          let backgroundColor = set[hash % set.length];
          let textColor = getTextColor(backgroundColor);
          return {
            'background-color': backgroundColor,
            'color': textColor
          }
        }
      }
    },
  },
  methods:{
    computeCustomStyle(data,index){
      return typeof this.customStyle === 'function'
        ? this.customStyle(data,index)
        : this.customStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.chips{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .chip-item{
    margin: 8px;
    height: 36px;
    border: none;
    display: inline-flex;
    outline: 0;
    font-size: 0.95rem;
    transition: .3s;
    align-items: center;
    white-space: nowrap;
    border-radius: 4px;
    vertical-align: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 3px 5px rgba(0,0,0,.12);

    &:hover{
      opacity: .83;
    }
  }

  .chip-label{
    padding: 0 12px;
    line-height: 1;
  }

  .delete-icon{
    font-size: 16px;
    color: #555;
    padding-left: 10px;
  }
}
</style>
