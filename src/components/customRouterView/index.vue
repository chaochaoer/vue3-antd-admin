<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition name="fade-transform" mode='out-in' :appear="true">
        <component :is="Component" />
      </transition>
    </template>
  </router-view>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style scoped lang="scss">
/* 进入动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>