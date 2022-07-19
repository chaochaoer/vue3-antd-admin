import { AsyncRecord } from './../components/dynamicForm/types';
import FormModal from "./formModal/index.vue"
import { render, createVNode } from "vue"
import { ModalSchema } from "@/components/customModal/types"

/**
 * options 一些props
 * callback 回调函数，例如执行编辑、删除之类的成功、失败的回调
 * id 编辑、删除的那条数据id
 */
export default <T>(options: {
  schema: ModalSchema<T>,
  callback?: (formList: /* 表单编辑后的数据 */T, record: /* 异步接口请求回来的表单数据 */T) => void,
  /* 请求表单数据的异步接口 */
  asyncRecord?: AsyncRecord<T>
}) => {
  let { schema, callback, asyncRecord } = options
  const container = document.createElement("div")
  const removeModal = () => {
    render(null, container)
    container.remove()
  }
  const formModal = createVNode(FormModal, { ...schema, removeModal, callback, asyncRecord })
  render(formModal, container)
  return formModal
}
