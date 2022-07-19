<template>
  <a-checkbox-group name="checkboxGroup" v-model:value="value"></a-checkbox-group>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { CheckboxGroup, Checkbox } from 'ant-design-vue';
export default defineComponent({
  name: 'checkBox-form',
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  props: {
    value: Array,
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

