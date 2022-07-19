<template>
  <a-config-provider :locale="zh_CN">
    <router-view v-if="isRouterAlive" />
  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import dayjs from 'dayjs';
import { defineComponent, nextTick, provide, ref } from 'vue';
import customRouterView from '@/components/customRouterView/index.vue';
dayjs.locale('zh-cn');
export default defineComponent({
  name: 'App',
  components: { customRouterView },
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide('reload', reload);
    return { zh_CN, isRouterAlive, dayjs };
  }
});
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: #f0f3f9;
}
</style>
