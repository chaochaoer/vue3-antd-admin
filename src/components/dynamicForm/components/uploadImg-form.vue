<template>
  <a-upload list-type="picture-card" v-model:file-list="value" v-bind="$attrs.componentProps"
    @before-upload="() => false" @preview="handlePreview">
    <div v-if="value?.length < $attrs.maxCount">
      <PlusOutlined />
      <div class="ant-upload-text">图片上传</div>
    </div>
  </a-upload>
  <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'; // 上传图片上面的加号
import { Upload, Modal } from 'ant-design-vue';
import { defineComponent, ref, computed } from 'vue';
export function img2binary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  name: 'uploadImg-form',
  components: {
    PlusOutlined,
    [Upload.name]: Upload,
    [Modal.name]: Modal,
  },
  props: {
    value: Array,
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const previewVisible = ref(false); // 预览图片
    const previewImage = ref(''); // 预览图片URL(base64)
    const previewTitle = ref(''); // 预览图片URL(base64)
    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = '';
    };
    const handlePreview = async file => {
      // 读取图片二进制流
      if (!file.url && !file.preview) {
        file.preview = await img2binary(file.originFileObj);
      }
      previewTitle.value = (file.name === 'image.png' ? undefined : file.name) || file.url.split("/").at(-1);
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const value = computed({
      get: () => {
        let imgList = []
        if (props.value instanceof Array) {
          props.value.forEach((value, index) => {
            if (typeof value === 'string') {
              const tmp = {
                uid: `-${index + 1}`,
                name: 'image.png',
                status: 'done',
                url: value
              }
              imgList.push(tmp);
            } else imgList.push(value);
          })
        }
        return imgList;
      },
      set: newValue => emit('update:value', newValue)
    });
    return {
      value,
      previewVisible,
      previewImage,
      handlePreview,
      previewTitle,
      handleCancel
    };
  }
});
</script>
