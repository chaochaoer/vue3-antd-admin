<template>
  <a-radio-group name="radioGroup" v-model:value="value"></a-radio-group>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { RadioGroup, Radio } from 'ant-design-vue';
export default defineComponent({
  name: 'radio-form',
  components: { [Radio.name]: Radio, [RadioGroup.name]: RadioGroup },
  props: {
    value: String
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });
    return { value };
  }
});
</script>
