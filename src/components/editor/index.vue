<template>
  <editor v-model="value" :init="initOptions" />
</template>

<script>
import editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/wordcount'
import { defineComponent, computed, ref, onMounted } from 'vue'
import gaiXie from './gaiXie.svg'

export default defineComponent({
  components: {
    editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    plugins: {
      type: String,
      default: 'fullscreen preview wordcount image autoresize'
    },
    toolbar: {
      type: String,
      default: 'fullscreen preview wordcount image undo redo | gaiXie'
    }
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.value,
      set: newValue => emit('update:value', newValue)
    });

    const initOptions = ref({
      menubar: '',
      language_url: '/tinymce/langs/zh_CN.js',
      language: 'zh_CN', // 语言类型
      skin_url: '/tinymce/skins/ui/oxide', // 皮肤：浅色
      // skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色
      plugins: props.plugins,
      toolbar: props.toolbar,
      content_css: 'tinymce/skins/content/default/content.css',
      // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
      // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
      // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
      // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
      images_upload_handler: async (blobInfo, success, failure) => {
        // let img;
        // const formData = new FormData();
        // const accessToken = getCache('accessToken');
        // const file = blobInfo.blob();
        // formData.append('file', file);
        // formData.append('accessToken', accessToken);
        // formData.append('imageType', 'user');
        // await uploadImg(formData).then(res => {
        //   img = res.data[0];
        // });
        // success(img)
        console.log('image')
      },
      setup: (editor) => {
        editor.ui.registry.addButton('gaiXie', {
          text: `<img style="width:20px;margin-right:8px;" src='${gaiXie}'>智能改写`,
          tooltip: '智能改写',
          onAction: () => {
            console.log('123')
          },
        })
      },
    })

    onMounted(() => {
      tinymce.init({})
    })
    return {
      initOptions,
      value
    }
  }
})
</script>
