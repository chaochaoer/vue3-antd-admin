import { FormProps } from 'ant-design-vue/lib/form';
import validate from '@/utils/validate';
import city from "@/utils/city"
import { FormSchema } from '@/components/dynamicForm/types';
import editor from "@/components/editor/index.vue"
import { shallowRef } from "vue"
const formSchema: FormSchema = {
  formType: 'edit',
  formProps: {
    labelAlign: 'left',
  },
  formItems: [
    /* 显示隐藏联动 */
    {
      type: "title",
      field: 'title0',
      value: "显示隐藏联动-隐藏之后取消对输入框的校验",
      colProps: {
        style: {
          marginBottom: "30px"
        }
      },
      componentProps: () => ({
        style: {
          fontSize: "16px",
        }
      })
    },
    {
      type: 'radio',
      label: '单选框',
      field: 'field1',
      value: '',
      colProps: {
        span: 6,
      },
      formItemProps: {
        labelCol: { span: 5 },
      },
      componentProps: () => ({
        options: [
          { key: "成功", value: "成功", label: "成功" },
          { key: "失败", value: "失败", label: "失败" },
        ],
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    {
      type: 'input',
      label: '输入框',
      field: 'field2',
      value: '',
      colProps: {
        span: 12,
      },
      hide: (formList) => formList.field1 === '失败',
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 异步拉取数据下拉框 */
    {
      type: "title",
      field: 'title1',
      value: "异步下拉框-远程拉取下拉数据",
      colProps: {
        style: {
          marginBottom: "30px"
        }
      },
      componentProps: () => ({
        style: {
          fontSize: "16px",
        }
      })
    },
    {
      type: 'select',
      label: '异步下拉框',
      field: 'field3',
      value: 'tom',
      colProps: {
        span: 8,
      },
      formItemProps: {
        labelCol: { span: 6 },
      },
      asyncOptions() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: 'jack', label: 'Jack', key: "jack" },
              { value: 'lucy', label: 'Lucy', key: "Lucy" },
              { value: 'tom', label: 'Tom', key: "tom" }
            ])
          }
            , 3e3)
        })
      },
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 启用禁用 */
    {
      type: "title",
      field: 'title2',
      value: "启用禁用-单选框选择禁用，输入框变成禁用状态并且输入框由必填变成选填",
      colProps: {
        style: {
          marginBottom: "30px"
        }
      },
      componentProps: () => ({
        style: {
          fontSize: "16px",
        }
      })
    },
    {
      type: 'radio',
      label: '单选框',
      field: 'field4',
      value: '',
      colProps: {
        span: 6,
      },
      formItemProps: {
        labelCol: { span: 5 },
      },
      componentProps: (formItems, formList) => ({
        options: [
          { key: "启用", value: "启用", label: "启用" },
          { key: "禁用", value: "禁用", label: "禁用" },
        ],
        placeholder: "请输入",
        onChange(e: any) {
          let controlItem = formItems.filter(item => item.field === 'field5')[0]
          let value = e.target.value
          if (value === '启用') {
            if (controlItem.type !== 'title') controlItem.rules = [{ required: true }]
            controlItem.componentProps = () => ({
              placeholder: "请输入",
              disabled: false
            })
          } else {
            if (controlItem.type !== 'title') controlItem.rules = [{ required: false }]
            controlItem.componentProps = () => ({
              placeholder: "请输入",
              disabled: true
            })
          }
        }
      }),
      rules: [{ required: true }],
    },
    {
      type: 'input',
      label: '输入框',
      field: 'field5',
      value: '',
      colProps: {
        span: 12,
      },
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
    /* 异步联动 */
    {
      type: "title",
      field: 'title3',
      value: "异步联动-第一个下拉框远程拉取数据，第二个下拉框的值根据第一个下拉框的值远程拉取对应数据",
      colProps: {
        style: {
          marginBottom: "30px"
        }
      },
      componentProps: () => ({
        style: {
          fontSize: "16px",
        }
      })
    },
    {
      type: 'select',
      label: '异步下拉框',
      field: 'field6',
      value: '',
      colProps: {
        span: 8,
      },
      formItemProps: {
        labelCol: { span: 6 },
      },
      asyncOptions() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: '杭州', label: '杭州', key: "杭州" },
              { value: '深圳', label: '深圳', key: "深圳" },
            ])
          }
            , 3e3)
        })
      },
      componentProps: (formItems, formList) => ({
        placeholder: "请输入",
        async onChange(e: any) {
          let controlItem = formItems.filter(item => item.field === 'field7')[0]
          // @ts-ignore
          controlItem.loading = true
          let tmp = await new Promise((resolve) => {
            let options = e === '杭州' ? [
              { value: '滨江区', label: '滨江区', key: "滨江区" },
              { value: '上城区', label: '上城区', key: "上城区" }
            ] : [
              { value: '南山区', label: '南山区', key: "南山区" },
              { value: '宝安区', label: '宝安区', key: "宝安区" }
            ]
            setTimeout(() => {
              resolve(options)
            }
              , 2e3)
          })
          // @ts-ignore
          controlItem.loading = false
          controlItem.componentProps = () => ({
            placeholder: "请输入",
            options: tmp
          })
          formList.field7 = ''
        }
      }),
      rules: [{ required: true }],
    },
    {
      type: 'select',
      label: '异步下拉框',
      field: 'field7',
      value: '',
      colProps: {
        span: 8,
      },
      formItemProps: {
        labelCol: { span: 6 },
      },
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
  ]
}
export default formSchema