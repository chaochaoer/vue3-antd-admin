<template>
  <div class="formContainer">
    表单校验成功拿到的数据：{{ validateInfo }}
    <br />
    <br />
    <br />
    <dynamicFrom v-bind='{ ...formSchema, asyncRecord }'>
      <a-button type="primary" html-type="submit">提交</a-button>
    </dynamicFrom>
  </div>
</template>

<script lang="ts" setup>
import dynamicFrom from "@/components/dynamicForm/index.vue"
import formSchema from "./formSchema"
import { ref } from "vue"
const asyncRecord = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      field1: 'field1',
      field2: 11,
      field3: '成功',
      field4: ["成功", "失败1"],
      field5: 'jack',
      field6: '随便填充一些内容',
      field7: [],
      field8: [],
    }), 3e3)
  })
}
let validateInfo = ref({})
// @ts-ignore
formSchema.formProps.onFinish = (validate) => {
  validateInfo.value = validate
}
</script>
<style scoped lang="scss">
.formContainer {
  padding: 20px 10px;
  background-color: #fff;
}
</style>