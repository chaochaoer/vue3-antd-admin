<template>
  <svg class="svgClass" :style="{ fontSize: size + 'px', color: color }" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'svgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`;
    }
  }
});
</script>
<style scoped lang="scss">
.svgClass {
  width: 1em;
  height: 1em;
  vertical-align: -0.21em;
  fill: #fff;
  overflow: hidden;
  outline: 0;
}
</style>
