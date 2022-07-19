<template>
  <a-result class="error-page" status="500" title="500" sub-title="对不起，服务器出问题了">
    <template #extra>
      <a-button type="primary" @click="returnHome">返回首页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'error_500',
  setup () {
    const { push } = useRouter()
    const returnHome = () => push('/index')
    return { returnHome }
  }
});
</script>
