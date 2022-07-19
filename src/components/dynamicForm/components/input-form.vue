<template>
  <a-input v-model:value="value" allowClear></a-input>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { Input } from 'ant-design-vue';
export default defineComponent({
  name: 'input-form',
  components: { [Input.name]: Input },
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
