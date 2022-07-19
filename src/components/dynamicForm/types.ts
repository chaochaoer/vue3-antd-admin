import type { Component, CSSProperties } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { FormProps, FormItemProps } from 'ant-design-vue/lib/form';
import { ColProps } from 'ant-design-vue/lib/col';
import type { InputProps, CheckboxProps, InputNumberProps, CascaderProps, RadioProps, TimeRangePickerProps, SelectProps, TextAreaProps, UploadProps } from 'ant-design-vue';

/* 组件可以透传的类型 */
type componentPropsMap = {
  input: InputProps
  checkBox: CheckboxProps
  inputNumber: InputNumberProps
  linkage: CascaderProps
  radio: RadioProps
  rangePicker: TimeRangePickerProps
  select: SelectProps
  textArea: TextAreaProps
  uploadImg: UploadProps,
  [key: string]: Indexable
}

/* formItem组件类型 */
export type ComponentType =
  | 'input'       // 输入框
  | 'checkBox'    // 复选框
  | 'linkage'     // 联动下拉框（例如省、市、区）
  | 'inputNumber' // 数字输入框
  | 'linkage'     // 联动框
  | 'radio'       // 单选框
  | 'rangePicker' // 日历
  | 'select'      // 复选框
  | 'textArea'    // 文本框
  | 'uploadImg'   // 图片上传
  | Component     // vue组件

/* formItem的参数 */
export interface FormItem<T = Indexable> {
  type: ComponentType,
  value: T[keyof T],
  field: keyof T,
  id?: string,
  label: string,
  rules?: Rule[],
  _options?: any[],
  hide?: (formList: T) => boolean,
  formItemProps?: FormItemProps,
  colProps?: ColProps & {
    style?: CSSProperties
  },
  loading?: boolean,
  asyncOptions?: () => Promise<any[]>,
  componentProps?: ComponentProps<T>
}

/* 表单标题 */
export type Title<T = Indexable> = {
  type: "title",
  value: string,
  field: string,
  id?: string,
  hide?: (formList: T) => boolean,
  colProps?: ColProps & {
    style?: CSSProperties
  },
  componentProps?: ComponentProps<T>
}

/* 把组件透传做成函数 */
export type ComponentProps<T = Indexable> = (formItems: FormItems<T>, formList: T) => componentPropsMap[keyof componentPropsMap] & {
  style?: CSSProperties
}

export type FormItems<T = Indexable> = (FormItem<T> | Title<T>)[]

/* 异步获取表单数据 */
export type AsyncRecord<T = any> = () => Promise<T>

/* 表单类型 */
export type FormType = "add" | 'detail' | 'edit' // detail时候，框子是禁用的
export { FormProps }
export type FormSchema<T = Indexable> = {
  formProps?: FormProps,
  formType?: FormType,
  formItems: FormItems<T>
}
