<template>
  <a-range-picker v-model:value="value" allowClear :ranges="ranges" show-time></a-range-picker>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { RangePicker } from 'ant-design-vue';
import dayjs from "dayjs";
export default defineComponent({
  name: 'rangePicker-form',
  components: { [RangePicker.name]: RangePicker },
  props: {
    value: Array,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });
    const ranges = {
      // 自定义日历的快捷标签
      本日: [dayjs().startOf('day'), dayjs()],
      本周: [dayjs().startOf('week').startOf("day"), dayjs()],
      本月: [dayjs().startOf('month').startOf("day"), dayjs()],
      本年: [dayjs().startOf('year').startOf("day"), dayjs()]
    };
    return { value, ranges };
  }
});
</script>
