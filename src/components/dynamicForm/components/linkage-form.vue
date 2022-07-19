<template>
  <a-cascader v-model:value="value" allowClear> </a-cascader>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { Cascader } from 'ant-design-vue';
export default defineComponent({
  name: 'linkage-form',
  components: { [Cascader.name]: Cascader },
  props: {
    value: Array,
    formItem: Object
  },
  setup(props, { emit, attrs }) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });
    return { value };
  }
});
</script>
