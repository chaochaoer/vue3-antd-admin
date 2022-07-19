<template>
  <div class="formContainer">
    表单校验成功拿到的数据：{{ validateInfo }}
    <br />
    <br />
    <br />
    <dynamicFrom v-bind='formSchema'>
      <a-button type="primary" html-type="submit">提交</a-button>
    </dynamicFrom>
  </div>
</template>

<script lang="ts" setup>
import dynamicFrom from "@/components/dynamicForm/index.vue"
import { ref } from "vue";
import formSchema from "./formSchema"

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