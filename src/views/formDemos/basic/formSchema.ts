import city from "@/utils/city"
import { FormSchema } from '@/components/dynamicForm/types';

const formSchema: FormSchema = {
  formType: 'edit',
  formProps: {
    labelCol: { span: 2, offset: 1 },
    labelAlign: 'left',
  },
  formItems: [
    /* 输入框 */
    {
      type: 'input',
      label: '输入框',
      field: 'field1',
      value: '',
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 数字输入框 */
    {
      type: 'inputNumber',
      label: '数字输入框',
      field: 'field2',
      value: NaN,
      componentProps: () => ({
        placeholder: "请输入",
        allowClear: true
      }),
      rules: [{ required: true }],
    },
    /* 单选框 */
    {
      type: 'radio',
      label: '单选框',
      field: 'field3',
      value: '',
      componentProps: () => ({
        options: [
          { key: "成功", value: "成功", label: "成功" },
          { key: "失败", value: "失败", label: "失败" },
        ],
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 复选框 */
    {
      type: 'checkBox',
      label: '复选框',
      field: 'field4',
      value: [],
      componentProps: () => ({
        options: [
          { key: "成功", value: "成功", label: "成功" },
          { key: "失败", value: "失败", label: "失败" },
          { key: "失败1", value: "失败1", label: "失败1" },
        ],
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 下拉框 */
    {
      type: 'select',
      label: '下拉框',
      field: 'field5',
      value: undefined,
      componentProps: () => ({
        placeholder: "请输入",
        options: [
          { value: 'jack', label: 'Jack', key: "jack" },
          { value: 'lucy', label: 'Lucy', key: "Lucy" },
          { value: 'tom', label: 'Tom', key: "Tom" }
        ]
      }),
      rules: [{ required: true }],
    },
    /* 文本框 */
    {
      type: 'textArea',
      label: '文本框',
      field: 'field6',
      value: '',
      componentProps: () => ({
        placeholder: "请输入",
        autoSize: { minRows: 3 },
      }),
      rules: [{ required: true }],
    },
    /* 联动组件 */
    {
      type: 'linkage',
      label: '联动组件',
      field: 'field7',
      value: [],
      componentProps: () => ({
        placeholder: "请输入",
        options: city
      }),
      rules: [{ required: true }],
    },
    /* 日期组件 */
    {
      type: 'rangePicker',
      label: '日期组件',
      field: 'field8',
      value: [],
      rules: [{ required: true }],
    },
  ]
}
export default formSchema