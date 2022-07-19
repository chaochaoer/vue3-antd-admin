import { defineComponent, PropType } from 'vue';
import menuItem from './menuItem';
import { SubMenu } from 'ant-design-vue';
import { hasRoute, type RouteRecordRaw } from "./utils"

export default defineComponent({
  name: 'subMenuItem',
  components: { menuItem, SubMenu },
  props: {
    currentRoute: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <a-sub-menu key={props.currentRoute.path} v-slots={{
        title: () => (<span style="margin-left: 8px">{props.currentRoute.meta?.title}</span>),
        icon: () => (props.currentRoute.meta?.icon ? <svg-icon icon={props.currentRoute.meta?.icon} /> : null)
      }}>
        {
          props.currentRoute.children?.map((route: RouteRecordRaw) => (
            <>
              {(route.children && hasRoute(route.children)) ? <subMenuItem key={route.path} currentRoute={route} /> : null}
              {((!route.children && !route.meta?.hidden) || (route.children && !hasRoute(route.children))) ? <menu-item currentRoute={route} /> : null}
            </>))
        }
      </a-sub-menu>
    )
  }
});

