import { defineComponent, PropType } from "vue";
import { Button, Popconfirm } from "ant-design-vue";

export type ActionItem = {
  label: string
  onClick?: Function
  popConfirm?: {
    onConfirm: () => Promise<any>
    title?: string
    okText?: string
    cancelText?: string
  }
}

export default defineComponent({
  name: "tableAction",
  props: {
    actions: {
      type: Array as PropType<ActionItem[]>,
      required: true
    }
  },
  components: { Button, Popconfirm },
  setup(props) {
    return () => props.actions.map((item: any, index) => (
      item.popConfirm ? <a-popconfirm
        title={item.popConfirm.title ?? '确定要删除这条数据吗'}
        ok-text={item.popConfirm.okText ?? '是的'}
        cancel-text={item.popConfirm.cancelText ?? "取消"}
        onConfirm={item.popConfirm.onConfirm}
      ><a-button type='link'>{item.label}</a-button></a-popconfirm> : <a-button type='link' onClick={item.onClick}>{item.label}</a-button>
    ))
  }
})