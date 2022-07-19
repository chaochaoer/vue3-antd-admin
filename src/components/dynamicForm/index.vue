<template>
  <a-form ref="formRef" :model="formList" v-bind="{ ...formProps, scrollToFirstError: true }">
    <a-row style="width:100% !important;">
      <template v-for="item in cloneFormItems" :key="item.id">
        <a-col v-if="!(item.hide && item.hide(formList))" v-bind="{ span: 24, ...item.colProps }">
          <span v-if="item.type === 'title'" v-text="item.value"
            v-bind="{ ...item.componentProps?.(cloneFormItems, formList) }" />
          <a-form-item v-else
            v-bind="{ name: item.field, rules: item.rules, label: item.label, ...item.formItemProps }">
            <a-spin :spinning="!!item.loading">
              <component :is="getComponent(item.type)" v-model:value="formList[item.field]"
                :disabled="formType === 'detail'"
                v-bind="{ options: item._options, ...item.componentProps?.(cloneFormItems, formList) }" />
            </a-spin>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-row justify="end">
      <slot />
    </a-row>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, PropType } from 'vue';
import { Form, FormItem, Spin, Row, Col, Button, type FormInstance } from 'ant-design-vue';
import components from './components';
import { cloneDeep } from 'lodash';
import type { FormItems, FormProps, ComponentType, FormType, AsyncRecord } from "./types"
import type { Rule } from 'ant-design-vue/es/form';

export default defineComponent({
  name: 'dynamicForm',
  props: {
    formItems: {
      type: Object as PropType<FormItems>,
      required: true
    },
    asyncRecord: {
      type: Function as PropType<AsyncRecord>,
    },
    formProps: {
      type: Object as PropType<FormProps>,
    },
    formType: {
      type: String as PropType<FormType>,
      default: 'edit'
    }
  },
  components: { ...components, [Button.name]: Button, [Form.name]: Form, [FormItem.name]: FormItem, [Spin.name]: Spin, [Col.name]: Col, [Row.name]: Row },
  setup(props) {
    const formRef = ref<FormInstance>();
    const state = reactive<{
      formList: Indexable
      rules: {
        [key: string]: Rule[]
      },
      record: Indexable
    }>({ formList: {}, rules: {},  /* 请求接口返回的数据 */record: {} });
    // 表格布局
    const formProps = { labelCol: { span: 3 }, wrapperCol: { span: 21 }, ...props.formProps };

    // 做数据的深拷贝，防止污染父组件props数据，因为这里需要操作并赋值
    let cloneFormItems = reactive(cloneDeep(props.formItems));

    for (let item of cloneFormItems) {
      if (item.type === 'title') continue
      state.rules[item.field] = item.rules!
    }

    const initFormItem = async (formItems: FormItems) => {
      state.record = (await props.asyncRecord?.()) || {}
      formItems.forEach(async (item) => {
        item.id = Math.random().toString(32).slice(2, 10);
        if (item.type === 'title') return
        state.formList[item.field] = state.record?.[item.field] || item.value;
        if (item?.asyncOptions) {
          item.loading = true;
          item._options = await item?.asyncOptions();
          item.loading = false;
        }
      })
    }
    const getComponent = (type: ComponentType) => type instanceof Object ? type : (type + '-form')

    // @ts-ignore
    initFormItem(cloneFormItems)

    return {
      ...toRefs(state),
      formRef,
      getComponent,
      cloneFormItems,
      formProps,
    };
  }
});
</script>

