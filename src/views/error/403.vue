<template>
  <a-result class="error-page" status="403" title="403" sub-title="对不起，你没有权限查看这个页面">
    <template #extra>
      <a-button type="primary" @click="returnHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'error_403',
  setup () {
    const { push } = useRouter()
    const returnHome = () => push('/index')
    return { returnHome }
  }
});
</script>
