<template>
  <a-textarea v-model:value="value" allowClear show-count></a-textarea>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { Input } from 'ant-design-vue';

export default defineComponent({
  name: 'textArea-form',
  components: { [Input.TextArea.name]: Input.TextArea },
  props: {
    value: String,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });
    return { value };
  }
});
</script>