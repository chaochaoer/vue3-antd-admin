<template>
  <div class="queryFormContainer">
    <dynamicForm ref="dynamicFormRef" v-bind="{
      ...queryFormSchema
    }" />
    <div class="operateItem">
      <a-button type="primary" @click="search" :loading="searchLoading">查 询</a-button>
      <a-button type="default" class="resetBtn" @click="reset" :loading='resetLoading'>重 置</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import dynamicForm from "@/components/dynamicForm/index.vue"
import { ref, defineComponent, PropType } from "vue";
import type { FormSchema } from "@/components/dynamicForm/types";

export default defineComponent({
  name: "queryForm",
  props: {
    queryFormSchema: {
      type: Object as PropType<FormSchema>,
      required: true
    },
    handleSearch: {
      type: Function,
      required: true
    }
  },
  components: { dynamicForm },
  setup(props) {
    const dynamicFormRef = ref()
    const searchLoading = ref<boolean>(false)
    const resetLoading = ref<boolean>(false)
    const search = async () => {
      searchLoading.value = true
      let result = await dynamicFormRef.value.formRef.validate()
      await props.handleSearch("merge", {
        ...result
      })
      searchLoading.value = false
    }
    const reset = async () => {
      resetLoading.value = true
      dynamicFormRef.value.formRef.resetFields()
      await props.handleSearch("init")
      resetLoading.value = false
    }
    props.queryFormSchema.formItems.forEach((item: any) => {
      if (!item.colProps) item.colProps = { span: 7 }
    })
    props.queryFormSchema.formProps = props.queryFormSchema.formProps ?? { labelCol: { span: 6 }, wrapperCol: { span: 18 } }
    return {
      dynamicFormRef, searchLoading, resetLoading, search, reset
    }
  }
})
</script>
<style scoped lang="scss">
.queryFormContainer {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 10px;

  .operateItem {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .resetBtn {
      margin: 0 0 0 20px;
    }
  }
}

.ant-form-item {
  margin-bottom: 24px !important;
}
</style>