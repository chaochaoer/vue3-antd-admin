<template>
  <a-input-number v-model:value="value"></a-input-number>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { InputNumber } from 'ant-design-vue';
export default defineComponent({
  name: 'inputNumber-form',
  components: { [InputNumber.name]: InputNumber },
  props: {
    value: Number,
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
