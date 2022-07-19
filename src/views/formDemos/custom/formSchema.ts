import { FormProps } from 'ant-design-vue/lib/form';
import validate from '@/utils/validate';
import city from "@/utils/city"
import { FormSchema } from '@/components/dynamicForm/types';
import editor from "@/components/editor/index.vue"
import { shallowRef } from "vue"
const formSchema: FormSchema = {
  formType: 'edit',
  formProps: {
    labelCol: { span: 2, offset: 1 },
    labelAlign: 'left',
    onFinish: (validate) => {
      console.log(validate, "123")
    }
  },
  formItems: [
    {
      type: "title",
      field: '0',
      value: "编辑",
      componentProps: () => ({
        style: {
          fontSize: "20px",
        }
      })
    },
    /* 输入框 */
    {
      type: 'input',
      label: '输入框',
      field: 'field1',
      value: '1',
      // colProps: {
      //   span: 12,
      // },
      // formItemProps: {
      //   labelCol: { span: 5 },
      // },
      componentProps: () => ({
        placeholder: "请输入",
      }),
      // disabled: true,
      rules: [{ required: true }],
    },
    /* 数字输入框 */
    {
      type: 'inputNumber',
      label: '数字输入框',
      field: 'field2',
      value: 1,
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
      value: '失败',
      componentProps: (formItems, formList) => ({
        options: [
          { key: "成功", value: "成功", label: "成功" },
          { key: "失败", value: "失败", label: "失败" },
        ],
        placeholder: "请输入",
        onChange() {
          formItems.filter(item => item.field === 'field5')[0].componentProps = (formItems, formList) => ({
            placeholder: "请输入",
            options: [
              { value: 'jack', label: 'Jack', key: "jack" },
              { value: 'lucy', label: 'Lucy', key: "Lucy" },
              { value: 'tom', label: 'Tom', key: "Tom" },
              { value: '1', label: '1', key: "1" },
              { value: '2', label: '2', key: "2" },
              { value: '3', label: '3', key: "3" },
              { value: '4', label: '4', key: "4" },
              { value: '5', label: '5', key: "5" },
              { value: '6', label: '6', key: "6" },
            ]
          })
          formList.field5 = ''
        }
      }),
      rules: [{ required: true }],
    },
    /* 复选框 */
    {
      type: 'checkBox',
      label: '复选框',
      field: 'field4',
      value: ['失败', '成功'],
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
      value: 'jack',
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
    /* 异步下拉框 */
    {
      type: 'select',
      label: '异步下拉框',
      field: 'field6',
      value: 'tom',
      componentProps: () => ({
        placeholder: "请输入",
        asyncOptions() {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ value: 'jack', label: 'Jack', key: "jack" },
              { value: 'lucy', label: 'Lucy', key: "Lucy" },
              { value: 'tom', label: 'Tom', key: "tom" }])
            }
              , 1e3)
          })
        },
      }),
      rules: [{ required: true }],

    },
    /* 文本框 */
    {
      type: 'textArea',
      label: '文本框',
      field: 'field7',
      value: '1',
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
      field: 'field8',
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
      field: 'field9',
      value: [],
      rules: [{ required: true }],
    },
    /* 图片上传 */
    {
      type: 'uploadImg',
      label: '图片上传',
      field: 'field10',
      value: [
        'http://image.irealcare.com/images/update/dd48a0687cb64187afcd40f46381b679.jpg',
        'http://image.irealcare.com/images/update/dd48a0687cb64187afcd40f46381b679.jpg'
      ],
      // value: [],
      rules: [{ required: true }],
      componentProps: () => ({
        maxCount: 4
      })
    },
    /* 异步联动组件 */
    {
      type: 'select',
      label: '单选框',
      field: 'field11',
      value: '',
      formItemProps: {
        labelCol: {
          span: 3
        }
      },
      colProps: {
        span: 11,
        offset: 1
      },
      asyncOptions() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: '1-1', label: '1-1', key: "1-1" },
              { value: '1-2', label: '1-2', key: "1-2" }
            ])
          }
            , 2e3)
        })
      },
      componentProps: (options: any, formList: any) => ({
        async onChange(e: any) {
          formList.field12 = ''
          let target = options.filter((item: any) => item.field === 'field12')[0]
          target.loading = true
          if (e == "1-1") {
            let tmp = await new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: '2-1', label: '2-1', key: "2-1" },
                  { value: '2-2', label: '2-2', key: "2-2" },
                ])
              }
                , 2e3)
            })
            target.loading = false
            target.componentProps = () => ({
              placeholder: "请输入",
              options: tmp
            })
          } else if (e == "1-2") {
            let tmp = await new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { value: '2-1-1', label: '2-1-1', key: "2-1-1" },
                  { value: '2-2-1', label: '2-2-1', key: "2-2-1" },
                ])
              }
                , 2e3)
            })
            target.loading = false
            target.componentProps = () => ({
              placeholder: "请输入",
              options: tmp
            })
          }
        }
      }),
      rules: [{ required: true }],
    },
    {
      type: 'select',
      label: '单选框',
      field: 'field12',
      value: '',
      formItemProps: {
        labelCol: {
          span: 3,
          offset: 1
        }
      },
      colProps: {
        span: 11,
        offset: 1
      },
      componentProps: (options: any, formList: any) => ({
        placeholder: "请选择"
      }),
      rules: [{ required: true }],
    },
    /* 自定义组件 */
    {
      type: shallowRef(editor),
      label: '自定义组件',
      field: 'field114',
      value: `<p>皮肤问题是很多女性关心的问题。每个人都希望自己的皮肤光滑白皙，但大多数人或多或少都有一些皮肤问题。有的人长痘痘，有的人长痘痘，有的人长黄褐斑等等。 </p><p>一般毛孔粗大的人脸上容易出现黑头，尤其是鼻子周围。怎样可以清除鼻子上的黑头？给大家分享几个去黑头的好方法吧。让我们看一看。 </p><p></p><p> </p><div class=\"media-wrap image-wrap\"><img class=\"media-wrap image-wrap\" alt=\"07a22e73.jpg\" src=\"http://image.irealcare.com/images/card/07a22e73.jpg\"/></div><p> </p><p></p><p>黑头的原因是皮肤分泌的油脂因为毛孔堵塞而堆积在毛孔里，被空气氧化后变黑。对于油性皮肤的人来说，黑头更严重。黑头会长在脸上，胸前，后背，特别是鼻子上。 </p><p></p><p> </p><div class=\"media-wrap image-wrap\"><img class=\"media-wrap image-wrap\" alt=\"fdbdc5a6.webp\" src=\"http://image.irealcare.com/images/card/fdbdc5a6.webp\"/></div><p> </p><p></p><p>千万不要挤黑头。一不小心就会损伤毛囊和皮脂腺，还可能引起感染。如果是痘痘，会留下痘印。那岂不是更难看？ </p><p>如何科学有效的去黑头？ </p><p>1.黑头精华：深层溶解毛孔污垢，去除老废角质，疏通毛孔；同时，薰衣草精油可以调节皮肤的PH值，抑制皮肤油脂分泌，预防痘痘。 </p><p>使用方法：均匀喷于化妆棉上，涂抹于鼻翼T区毛孔粗大处5~7分钟。 </p><p></p><p> </p><div class=\"media-wrap image-wrap\"><img class=\"media-wrap image-wrap\" alt=\"eb7271f1.webp\" src=\"http://image.irealcare.com/images/card/eb7271f1.webp\"/></div><p> </p><p></p><p>2.果酸：是从水果中提取的多种有机酸。由于其卓越的功效，果酸被广泛用于皮肤管理。去除多余角质，改善皮肤干燥和角化。可以改善黑头和痘痘。 </p><p>使用方法：洁面后，用刷子将薄涂均匀涂抹于面部，顺序为鼻子-额头-下巴-脸颊，时间从开始涂抹开始，停留5分钟，然后用冷毛巾或海绵擦拭干净。 </p><p></p><p> </p><div class=\"media-wrap image-wrap\"><img class=\"media-wrap image-wrap\" alt=\"c5612feb.jpg\" src=\"http://image.irealcare.com/images/card/c5612feb.jpg\"/></div><p> </p><p></p><p>3.收缩毛孔：起到净化作用，可以改善油脂分泌过多导致的皮肤毛孔粗大，缩小毛孔。 </p><p>使用方法：在油性皮肤管理结束时使用，促进产品吸收，为皮肤锁住水分。清洁痘痘后使用，有助于收缩毛孔。 </p><p></p><p> </p><div class=\"media-wrap image-wrap\"><img class=\"media-wrap image-wrap\" alt=\"cc85aad9.webp\" src=\"http://image.irealcare.com/images/card/cc85aad9.webp\"/></div><p> </p><p></p><p>就这些了。希望对你有帮助。 </p>`,
      componentProps: () => ({
        placeholder: "请输入",
      }),
      rules: [{ required: true }],
    },
  ]
}
export default formSchema