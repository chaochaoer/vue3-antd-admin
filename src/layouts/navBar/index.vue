<template>
  <div class="navContainer">
    <div style="margin-right:20px">
      <slot />
    </div>
    <breadcrumb></breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import breadcrumb from './breadcrumb';

</script>
<style lang="scss" scoped>
.navContainer {
  display: flex;
  align-items: center;
  height: 64px !important;
  padding: 0 20px;
  background-color: #fff;
}
</style>
