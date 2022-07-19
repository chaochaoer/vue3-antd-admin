<template>
  <a-result class="error-page" status="404" title="404" sub-title="对不起，你访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="returnHome">返回首页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'error_404',
  setup () {
    const { push } = useRouter()
    const returnHome = () => push('/index')
    return { returnHome }
  }
});
</script>
