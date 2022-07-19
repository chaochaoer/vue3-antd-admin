<template>
  <a-select v-model:value="value" allowClear></a-select>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { Select } from 'ant-design-vue';
export default defineComponent({
  name: 'select-form',
  components: { [Select.name]: Select, [Select.Option.name]: Select.Option },
  props: {
    value: String
  },
  setup(props, { emit}) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });
    return { value };
  }
});
</script>
