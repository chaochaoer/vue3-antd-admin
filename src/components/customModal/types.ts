import type { FormSchema } from "@/components/dynamicForm/types"
import { ModalProps } from "ant-design-vue"
export type ModalType = "add" | 'detail' | 'edit' // modal框类型
export type ModalPropsOpt = {
  modalType: ModalType
} & ModalProps

export type ModalSchema<T = Indexable> = {
  modalProps: ModalPropsOpt
} & FormSchema<T>
export { ModalPropsOpt as ModalProps }

export type CallBack<T = Indexable> = (formList: /* 表单编辑后的数据 */T, record: /* 异步接口请求回来的表单数据 */T) => void

