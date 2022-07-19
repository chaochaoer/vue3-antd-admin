<template>
  <a-modal v-model:visible="modalVisible" v-bind="{
    centered: true, confirmLoading, onAfterClose: removeModal, onOk: onOK, width: '1000px', ...modalProps,
  }">
    <dynamicForm ref="dynamicFormRef" v-bind="{ formItems, asyncRecord, formProps, formType: modalProps.modalType }" />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import dynamicForm from '@/components/dynamicForm/index.vue';
import type { ModalProps, CallBack } from "./types"
import type { FormItems, FormProps, AsyncRecord } from "@/components/dynamicForm/types"
import { Modal } from 'ant-design-vue';
export default defineComponent({
  name: 'commonFormModal',
  components: { [Modal.name]: Modal, dynamicForm },
  props: {
    modalProps: {
      type: Object as PropType<ModalProps>,
      required: true
    },
    formProps: {
      type: Object as PropType<FormProps>,
    },
    formItems: {
      type: Object as PropType<FormItems>,
      required: true
    },
    asyncRecord: {
      type: Function as PropType<AsyncRecord>,
    },
    removeModal: {
      type: Function as PropType<() => void>,
      required: true
    },
    callback: Function as PropType<CallBack>,
  },
  setup({ modalProps, callback }) {
    const dynamicFormRef = ref();
    const confirmLoading = ref(false); // 点击确定按钮的loading
    const modalVisible = ref(true);    // 模态框的显示、隐藏

    const onOK = async () => {
      if (modalProps.modalType === 'edit' || modalProps.modalType === 'add') {
        dynamicFormRef.value.formRef
          .validate()
          .then(async (formList: any) => {
            confirmLoading.value = true;
            callback && (await callback(formList, dynamicFormRef.value.record)); // 表单验证成功，执行编辑提交之类的操作
            confirmLoading.value = false;
            modalVisible.value = false;
            console.log(formList, 'oK');
          })
          .catch((err: any) => {
            dynamicFormRef.value.formRef.scrollToField(err.errorFields[0].name[0])
            confirmLoading.value = false;
            console.log(err, 'err');
          });
      } else if (modalProps.modalType === 'detail') {
        modalVisible.value = false;
      }
    };
    return {
      confirmLoading,
      modalVisible,
      onOK,
      dynamicFormRef
    };
  }
});
</script>
