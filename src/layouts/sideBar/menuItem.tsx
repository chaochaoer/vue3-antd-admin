import { defineComponent, PropType } from 'vue';
import { MenuItem } from 'ant-design-vue';
import type { RouteRecordRaw } from './utils';

export default defineComponent({
  name: 'menuItem',
  components: {
    MenuItem
  },
  props: {
    currentRoute: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <>
        <a-menu-item key={props.currentRoute.path} v-slots={{
          icon: () => (props.currentRoute.meta?.icon ? <svg-icon icon={props.currentRoute.meta?.icon} size={18} /> : null)
        }}>
          <router-link to={props.currentRoute.path}>
            <span style="margin-left: 8px">{props.currentRoute.meta?.title}</span>
          </router-link>
        </a-menu-item>
      </>
    )
  },
});
